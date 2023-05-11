function updateCities() {
    var stateElement = document.getElementById("state");
    var cityElement = document.getElementById("city");
    var selectedState = stateElement.options[stateElement.selectedIndex].value;

    // Remove all options from the city dropdown
    cityElement.innerHTML = "";

    // Add the default "Select a city" option to the city dropdown
    var defaultOption = document.createElement("option");
    defaultOption.text = "Select a city";
    defaultOption.value = "";
    cityElement.add(defaultOption);

    // Get the list of cities for the selected state and add them to the city dropdown
    var cities = getCitiesForState(selectedState);
    for (var i = 0; i < cities.length; i++) {
        var option = document.createElement("option");
        option.text = cities[i];
        option.value = cities[i];
        cityElement.add(option);
    }
}

function getCitiesForState(state) {
    switch (state) {
        case "Andhra Pradesh":
            return ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"];
        case "Arunachal Pradesh":
            return ["Itanagar", "Tawang", "Naharlagun", "Pasighat", "Roing"];
        case "Assam":
            return ["Guwahati", "Jorhat", "Silchar", "Dibrugarh", "Tezpur"];
        case "Bihar":
            return ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"];
        case "Chhattisgarh":
            return ["Raipur", "Bhilai", "Bilaspur", "Korba", "Raigarh"];
        case "Goa":
            return ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"];
        case "Gujarat":
            return ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"];
        case "Haryana":
            return ["Faridabad", "Gurgaon", "Hisar", "Panipat", "Karnal"];
        case "Himachal Pradesh":
            return ["Shimla", "Mandi", "Solan", "Dharamshala", "Una"];
        case "Jharkhand":
            return ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"];
        case "Karnataka":
            return ["Bangalore", "Mysore", "Hubli-Dharwad", "Mangalore", "Belgaum"];
        case "Kerala":
            return ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"];
        case "Madhya Pradesh":
            return ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"];
        case "Maharashtra":
            return ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"];
        case "Manipur":
            return ["Imphal", "Thoubal", "Kakching", "Lilong", "Mayang Imphal"];
        case "Meghalaya":
            return ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara"];
        case "Mizoram":
            return ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"];
        case "Nagaland":
            return ["Kohima", "Dimapur", "Wokha", "Mokokchung", "Tuensang"];
        case "Odisha":
            return ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"];
        case "Punjab":
            return ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"];
        case "Rajasthan":
            return ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Bikaner"];
        case "Sikkim":
            return ["Gangtok", "Namchi", "Mangan", "Joreka", "Ravangla"];
        case "Tamil Nadu":    
            return ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"];
        case "Telangana":
                return ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"];
        case "Tripura":
                return ["Agartala", "Udaipur", "Belonia", "Dharmanagar", "Kailashahar"];
        case "Uttar Pradesh":
                return ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut"];
        case "Uttarakhand":
                return ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur"];
        case "West Bengal":
                return ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman"];
        default:
                return [];
        }
    }