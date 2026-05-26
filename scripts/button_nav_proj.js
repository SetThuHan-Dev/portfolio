/*
    This script handles the content assignment of project data
*/

const ProjectNames = 
[
    "sirCodeAlot",
    "ropeAndBalls",
    "fillOneLine",
    "fillThemAll",
    "woodo",

    "route",
    "stack",
    "gasStation",
    "mofupon",
    "dragonSmash",
    "tinyPark",

    "eduGames",
    "monkeyBubble",
    "littleChallenger",
]

const ProjectCacheVersion = window.PORTFOLIO_VERSION || "20260526";
let ProjectText = [];

let projTextArea = document.getElementById("project_data_area");

/* Adds the included text data into the array of text. */
for(let i = 0; i < ProjectNames.length; ++i)
{
    ProjectText.push("");
    fetch("./Data/pages/projects/" + ProjectNames[i] + ".html?v=" + ProjectCacheVersion)
    .then( r => r.text() )
    .then( t => ProjectText[i] = t )
}

function LoadProject(button, btnIndex)
{
    const detailBody = document.getElementById("project-detail-body");
    const activeButtons = document.getElementsByClassName("proj-button-active");
    
    if(!detailBody)
        return;

    while(activeButtons.length > 0)
        activeButtons[0].className = "proj-button";

    button.className = "proj-button-active";
    detailBody.innerHTML = ProjectText[btnIndex];
    detailBody.classList.remove("project-detail-visible");

    setTimeout(function()
    {
        detailBody.classList.add("project-detail-visible");
        detailBody.focus({ preventScroll: true });
        detailBody.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 20);
}
