//define global variables
var issuesContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo)
{
    var apiURL = "https://api.github.com/repos/" +repo+ "/issues?direction=asc";
    fetch(apiURL).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                displayIssues(data);
            });
        }
        else
        {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues)
{
    if (issues.length === 0)
    {
        issuesContainerEl.textContent = "This repo currently has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; i++)
    {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create a span for title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");
        //check for issue or pull request
        if (issues[i].pull_request)
        {
            typeEl.textContent = "(pull request)";
        }
        else
        {
            typeEl.textContent = "(issue)";
        }
        issuesContainerEl.appendChild(issueEl);
        issueEl.appendChild(typeEl);
    }
};

getRepoIssues("xunvyre/the-taskinator");