const searchField = document.querySelector("#searchField");

const tableOutput = document.querySelector(".table-output");
const appTable = document.querySelector(".app-table");
const paginationContainer = document.querySelector(".pagination-container");
tableOutput.style.display = "none";
const noResults = document.querySelector(".no-results");
const tbody = document.querySelector(".table-body");

searchField.addEventListener("keyup", (e) => {
  const searchValue = e.target.value;

  if (searchValue.trim().length > 0)
    {
        paginationContainer.style.display = "none";
        tbody.innerHTML = "";
        //Sending request to url in views.py with searchvalue retrieved from input form
        fetch("/search-expenses", {
                                    body: JSON.stringify({ searchText: searchValue }),
                                    method: "POST",
                                  })
        //Reading response from view search_expenses, response is object whereas data is attribute in  response after its converted to json
        .then((response) =>{
            console.log(response,'Response');
            return response.json()
            })
        .then((data) => {
            console.log("data", data);
            appTable.style.display = "none";
            tableOutput.style.display = "block";

            console.log("data.length", data.length);

            if (data.length === 0) {
                noResults.style.display = "block";
                tableOutput.style.display = "none";
                }
            else {
                noResults.style.display = "none";
                data.forEach((item) => {
                    tbody.innerHTML += `
                    <tr>
                    <td>${item.amount}</td>
                    <td>${item.category}</td>
                    <td>${item.description}</td>
                    <td>${item.date}</td>
                    </tr>`;
                    });
                }
            });
    }
  else {
    tableOutput.style.display = "none";
    appTable.style.display = "block";
    paginationContainer.style.display = "block";
    }
});