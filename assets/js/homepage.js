//define variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event)
{
    event.preventDefault();

    //get the trimmed value of the form input
    var username = nameInputEl.value.trim();
    //and check to see if the value is valid before passing it to getUserRepos
    if (username)
    {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else
    {
        alert("Please enter a valid GitHub username!");
    }
};

var getUserRepos = function(user)
{
    //format the github api url
    var apiURL = "https://api.github.com/users/" +user+ "/repos";

    //make a request to the url
    fetch(apiURL).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                displayRepos(data, user);
            });
        }
        else
        {
            alert("Error: GitHub user not found!");
        }
    })
    .catch(function(error)
    {
        alert("Unable to connect to GitHub :(");
    });
};

var displayRepos = function(repos, searchTerm)
{
    //check for repos
    if (repos.length === 0)
    {
        repoContainerEl.textContent = "No repositories found!";
        return;
    }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (var i = 0; i < repos.length; i++)
    {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element for the repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if repo has issues
        if (repos[i].open_issues_count > 0)
        {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else
        {
            statusEl.innerHTML = "<i class ='fas fa-check-square status-icon icon-success'></i>";
        }

        //appends
        repoEl.appendChild(titleEl);
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}
 
userFormEl.addEventListener("submit", formSubmitHandler);