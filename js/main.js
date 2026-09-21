/*
  The getData() async function retrieves JSON data from the airbnb file and 
  converts it to a JS object.

  return: JS object of airbnb data.
*/
async function getData() {
  //fetch JSON from file
  const res = await fetch("data/airbnb_sf_listings_500.json");
  //create JS object
  const listings = await res.json();
  return listings;
}

/*
  The unpackAmenities() function loops through the amenities array in the JS
  object returned from the file and puts them into list elements.

  return: string of amenities in <li> tags.
*/
function unpackAmenities(amenities) {
  let amenitiesList = "";

  if (Array.isArray(amenities)) {
    amenities.forEach((e) => {
      amenitiesList += `<li>${e}</li>`;
    });
  }

  return amenitiesList;
}

/*
  The loadData() async function calls getData(), takes a slice of the first 50
  elements in the JS object, and then builds cards in HTML to display.

  return: none.
*/
async function loadData() {
  //get JSON data and select first 50 listings
  const listingData = await getData();
  const dataFirstFifty = listingData.slice(0, 50);

  let rows = "";

  //for each listing, add picture, name, description, price, host picture,
  //host name, listing URL, amenities to a card
  dataFirstFifty.forEach((e) => {
    const amenitiesArray = JSON.parse(e["amenities"]);
    console.log(amenitiesArray);
    const amenitiesHTML = unpackAmenities(amenitiesArray);

    const card = `<div class="col-12 col-lg-4 g-4">
            <div class="listing card">
              <img
                src="${e["picture_url"]}"
                class="card-img-top unit-image"
                alt="AirBnB unit"
              />
              <div class="scrollable">
                <div class="list-group list-group-flush">
                  <div class="card-body">
                    <h5 class="card-title list-group-item">${e["name"]}</h5>
                    <p class="card-text list-group-item">${e["description"]}</p>
                    <div class="card-text list-group-item">Amenities: ${amenitiesHTML}</div>
                    <p class="card-text list-group-item">Price: ${e["price"]}</p>

                    <div class="list-group-item">
                      <img 
                        src="${e["host_picture_url"]}"
                        class="host-image"
                        alt="AirBnB host"
                      />
                      <p class="card-text">Host: ${e["host_name"]} </p>
                    </div>
                    <a href="${e["listing_url"]}" 
                      target="_blank" 
                      class="btn btn-primary listing-button"
                    >View Listing</a>
                  </div>
                </div>
              </div>
            </div>
            <!-- /card -->
          </div>`;

    rows += card;
  });

  //add cards to the listings element in the HTML
  const listingsElement = document.querySelector("#listings");
  listingsElement.innerHTML = rows;
}

/*
  The expand() function allows the cards on the page to toggle between
  being scrollable and fully expanded.

  return: none.
*/
function expand() {
  //find all scroll boxes
  const scrollBoxes = document.querySelectorAll(".scrollable");

  //check that there are scrollable elements on page
  if (scrollBoxes.length) {
    //if length > 0, change each class to expanded and update button text
    scrollBoxes.forEach((e) => {
      e.classList.remove("scrollable");
      e.classList.add("expanded");
      document.querySelector("#expandbtn").innerHTML = "Shrink View";
    });
  } else {
    //if scrollBoxes.length == 0, change each class to scrollable and update button
    const expandBoxes = document.querySelectorAll(".expanded");
    expandBoxes.forEach((e) => {
      e.classList.remove("expanded");
      e.classList.add("scrollable");
      document.querySelector("#expandbtn").innerHTML = "Expand View";
    });
  }
}

/*
  The addExpand() function adds expand() to a button as an event listener.

  return: none.
*/
function addExpand() {
  const expandBtn = document.querySelector("#expandbtn");
  expandBtn.addEventListener("click", expand);
}

//execute when page loads
addExpand();
loadData();
