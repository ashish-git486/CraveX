from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
from datetime import datetime



def scrape_zomato(location, dish):
    options = Options()
    options.binary_location = '/Applications/Google Chrome .app/Contents/MacOS/Google Chrome'  
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_argument('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)

    driver = None
    try:
        driver = webdriver.Chrome(
            service=Service('/Users/chandrakantsinghdanu/Documents/PBLDAA/Backend/chromedriver-mac-arm64/chromedriver'),
            options=options
        )
    except Exception as e:
        print(f"Chrome driver setup failed: {e}")
        return []

    try:
        city = location.split(",")[0].strip()
        dish_url = dish.replace(" ", "-")
        start_time = time.time()
        url = f"https://www.zomato.com/{city}/delivery/dish-{dish_url}"
        print(f"Scraping Zomato for: {url}")
        driver.get(url)
        time.sleep(2)

        cards = driver.find_elements(By.CSS_SELECTOR, "div.sc-evWYkj.cRThYq")
        results = []
        i=0
        for card in cards:
            # Restaurant name
            try:
                restaurant = card.find_element(By.XPATH, "//h4[contains(@class, 'sc-1hp8d8a-0') and contains(@class, 'sc-Ehqfj') and contains(@class, 'bxOQva')]").text
            except:
                restaurant = "N/A"
            # Rating
            try:
                rating = card.find_element(By.CSS_SELECTOR, "div.sc-1q7bklc-1.cILgox").text
            except:
                rating = "N/A"
            # Price
            try:
                price =card.find_element(By.CSS_SELECTOR, "p.sc-1hez2tp-0.sc-gggouf.KXcjT").text
                price =price.replace("₹", "").replace("for one", "").strip()
            except:
                price = "N/A"
            # Image
            try:
                img = card.find_element(By.XPATH, "//img[contains(@class, 'sc-s1isp7-5') and contains(@class, 'fyZwWD')]")
                image_url = img.get_attribute("src")            
            except:
                image_url = "N/A"
            # Zomato URL
            try:
                link = card.find_element(By.XPATH, "//a[contains(@class, 'sc-hqGPoI') and contains(@class, 'kCiEKB')]")
                url = link.get_attribute("href")
            except:
                url = "N/A"
            i=i+1
            results.append({
                "id": i,
                "name": dish,
                "price": price,
                "restaurant": restaurant,
                "rating": rating,
                "image": image_url,
                "platform": "zomato",
                "url": url,
                "scraped_at": datetime.now().isoformat(),
                "execution_time": time.time() - start_time
            })

        return results

    except Exception as e:
        print(f"Error scraping Zomato: {e}")
        return []
    finally:
        if driver:
            driver.quit()

if __name__ == "__main__":

    results = scrape_zomato("dehradun", "biryani")
    print(results)

  
  