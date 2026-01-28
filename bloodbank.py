import webbrowser

def find_blood_banks():
    search_query = "https://www.google.com/maps/search/blood+bank+near+me"
    webbrowser.open(search_query)
    print("Redirecting to Google Maps to show nearby blood banks...")

find_blood_banks()
