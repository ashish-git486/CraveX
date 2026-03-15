from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json
from datetime import datetime

def scrape_swiggy(location, dish):
    
    options = Options()
    options.binary_location = '/Applications/Google Chrome .app/Contents/MacOS/Google Chrome'
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_argument('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    # Disable images to speed up loading
    prefs = {"profile.managed_default_content_settings.images": 2}
    options.add_experimental_option("prefs", prefs)
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    
    try:
        # Use manual chromedriver path for ARM64 (Apple Silicon)
        driver = webdriver.Chrome(
            service=Service('/Users/chandrakantsinghdanu/Documents/PBLDAA/Backend/chromedriver-mac-arm64/chromedriver'),
            options=options
        )
        print("Chrome driver setup successful using manual chromedriver (ARM64)")
    except Exception as e:
        print(f"Manual chromedriver failed: {e}")
        return []
    
    if not driver:
        print("Failed to setup Chrome driver. Cannot proceed with Swiggy scraping.")
        return []
    
    try:
        print(f"Starting Swiggy scraping for {location}, {dish}")
        start_time = time.time()
        
        driver.get("https://www.swiggy.com/")
        print("Swiggy website loaded")

        # Step 1: Wait for and enter location
        try:
            location_input = WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.ID, "location"))
            )
            location_input.clear()
            location_input.send_keys(location)
            print(f"Location entered: {location}")
        except Exception as e:
            print(f"Error entering location: {e}")
            return []

        # Step 2: Click first suggestion
        try:
            WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "_2OORn"))
            ).click()
            print(f"Location set to {location}")
        except Exception as e:
            print(f"Error selecting location suggestion: {e}")
            # Try alternative selectors
            try:
                location_suggestions = driver.find_elements(By.CSS_SELECTOR, "[class*='suggestion'], [class*='location']")
                if location_suggestions:
                    location_suggestions[0].click()
                    print("Location selected using alternative method")
                else:
                    print("No location suggestions found")
                    return []
            except Exception as e2:
                print(f"Alternative location selection also failed: {e2}")
                return []

        # Step 3: Click search bar
        try:
            search_bar = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//div[text()='Search for restaurant, item or more']"))
            )
            search_bar.click()
            print("Search input clicked.")
        except Exception as e:
            print(f"Error clicking search bar: {e}")
            # Try alternative selectors
            try:
                search_selectors = [
                    "//input[@placeholder='Search for restaurants and food']",
                    "//div[contains(@class, 'search')]",
                    "//input[contains(@placeholder, 'Search')]"
                ]
                for selector in search_selectors:
                    try:
                        search_elem = driver.find_element(By.XPATH, selector)
                        search_elem.click()
                        print("Search bar clicked using alternative selector")
                        break
                    except:
                        continue
            except Exception as e2:
                print(f"Alternative search bar selection also failed: {e2}")
                return []

        # Step 4: Search for dish
        try:
            search_input = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Search for restaurants and food"]'))
            )
            search_input.clear()
            search_input.send_keys(dish)
            search_input.send_keys(Keys.ARROW_DOWN)
            search_input.send_keys(Keys.ENTER)
            print(f"Search term entered: {dish}")
        except Exception as e:
            print(f"Error entering search term: {e}")
            return []

        # Step 5: Wait for results with multiple selectors
        items = []
        selectors_to_try = [
            f"//div[contains(@class, 'sc-aXZVg') and contains(text(),'{dish}')]",
            f"//div[contains(text(),'{dish}')]",
            "//div[contains(@class, 'food-item')]",
            "//div[contains(@class, 'restaurant-item')]"
        ]
        
        for selector in selectors_to_try:
            try:
                WebDriverWait(driver, 10).until(
                    EC.presence_of_all_elements_located((By.XPATH, selector))
                )
                items = driver.find_elements(By.XPATH, selector)
                if items:
                    print(f"Found {len(items)} items using selector: {selector}")
                    break
            except:
                continue
        
        if not items:
            print("No items found with any selector")
            return []
        
        time.sleep(3)  # Additional buffer for rendering

        info = []
        for i, item in enumerate(items):
            try:
                # Try to get the parent container
                try:
                    parent = item.find_element(By.XPATH, "./ancestor::div[contains(@class, '_2DMsY')]")
                except:
                    # If parent not found, use the item itself
                    parent = item

                # Extract dish name
                try:
                    name = item.text.strip()
                    if not name:
                        name = dish  # Fallback to search term
                except:
                    name = dish

                # Extract price
                try:
                    price_selectors = [
                        ".sc-aXZVg.chixpw",
                        "[class*='price']",
                        "[class*='cost']",
                        "span[class*='price']"
                    ]
                    price_text = "Check menu for prices"
                    for selector in price_selectors:
                        try:
                            price_elem = parent.find_element(By.CSS_SELECTOR, selector)
                            price_text = price_elem.text.strip()
                            if price_text:
                                break
                        except:
                            continue
                except:
                    price_text = "Check menu for prices"

                # Extract restaurant name
                try:
                    restaurant_selectors = [
                        ".//div[starts-with(text(), 'By ')]",
                        "[class*='restaurant']",
                        "[class*='vendor']"
                    ]
                    restaurant = "Restaurant name not available"
                    for selector in restaurant_selectors:
                        try:
                            restaurant_elem = parent.find_element(By.XPATH, selector)
                            restaurant_text = restaurant_elem.text.strip()
                            if restaurant_text.startswith("By "):
                                restaurant = restaurant_text.replace("By ", "").strip()
                            else:
                                restaurant = restaurant_text
                            if restaurant:
                                break
                        except:
                            continue
                except:
                    restaurant = "Restaurant name not available"

                # Extract rating
                try:
                    rating_selectors = [
                        "//span[@class='_30uSg']",
                        "[class*='rating']",
                        "[class*='star']"
                    ]
                    rating = "Not available"
                    for selector in rating_selectors:
                        try:
                            rating_elem = parent.find_element(By.XPATH, selector)
                            rating = rating_elem.text.strip()
                            if rating:
                                break
                        except:
                            continue
                except:
                    rating = "Not available"

                # Extract image
                try:
                    img_selectors = [
                        "img._3XS7H",
                        "img[src*='swiggy']",
                        "img"
                    ]
                    img_link = None
                    for selector in img_selectors:
                        try:
                            img_elem = parent.find_element(By.CSS_SELECTOR, selector)
                            img_link = img_elem.get_attribute("src")
                            if img_link:
                                break
                        except:
                            continue
                except:
                    img_link = None
                
                try:
                   link = parent.find_element(By.XPATH, "//a[contains(@class, '_3VPpz')]")
                   url = link.get_attribute("href")
                except:
                    url = "N/A"

                # Create JSON object with metadata
                JSONobject = {
                    "id": i + 1,
                    "name": name,
                    "price": price_text,
                    "restaurant": restaurant,
                    "rating": rating,
                    "image": img_link,
                    "platform": "swiggy",
                    "Url": url,
                    "scraped_at": datetime.now().isoformat(),
                    "execution_time": time.time() - start_time
                }
                info.append(JSONobject)
                
            except Exception as e:
                print(f"Error scraping item {i}: {e}")
                continue

        execution_time = time.time() - start_time
        print(f"Swiggy scraping completed: {len(info)} results in {execution_time:.2f} seconds")
        return info

    except Exception as e:
        print(f"Swiggy scraping failed: {e}")
        return []
    finally:
        if driver:
            driver.quit()



if __name__ == "__main__":
    print("Testing Swiggy scraper...")
    info = scrape_swiggy_icecream("Dehradun", "Ice cream")
    print(info)
    
    