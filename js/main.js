async function getData() {
  //fetch JSON from file
  const res = await fetch("../data/airbnb_sf_listings_500.json");
  //create JS object
  const listings = await res.json();
  return listings;
}

async function main() {
  //get JSON data and select first 50 listings
  const listingData = await getData();
  const dataFirstFifty = listingData.slice(0, 50);

  let rows = "";

  //for each listing, add picture, name, description, price, host picture, 
  //host name, listing URL to a card
  dataFirstFifty.forEach((e) => {
    const card = `<div class="col-4 g-4">
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
                    <p class="card-text list-group-item">Price: ${e["price"]}</p>

                    <div class="list-group-item">
                      <img 
                        src="${e["host_picture_url"]}"
                        class="host-image"
                        alt="AirBnB host"
                      />
                      <p class="card-text">Host: ${e["host_name"]} </p>
                    </div>
                    <a href="${e["listing_url"]}" target="_blank" class="btn btn-primary listing-button"
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

function expand() {
  const scrollBoxes = document.querySelector(".scrollable");
  if (scrollBoxes) {
    scrollBoxes.forEach((e) => {
      e.classList.remove("scrollable");
      e.classList.add("expanded");
    });
  }
}

main();
