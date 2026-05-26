/*
    This script handles the navigation selection between the main content buttons.
*/

const ContentNames = 
[
    "projects",
    "career",
    "skills",
    "research"
];

const TextAreaMinHeightExtended = "200px";
const TextAreaMinHeightClosed = "0px";
const TransitionDuration = 0;
const ContentCacheVersion = window.PORTFOLIO_VERSION || "20260526";

let IncludeText = [];
let lastButtonIndex = -1;
let buttonLock = false;

/* Adds the included text data into the array of text. */
for(let i = 0; i < ContentNames.length; ++i)
{
    IncludeText.push("");
    fetch("./Data/pages/" + ContentNames[i] + ".html?v=" + ContentCacheVersion)
    .then( r => r.text() )
    .then( t => IncludeText[i] = t )
}

/* Display the included text for the correct content. */

function focusContentArea(textArea)
{
    const targetTop = textArea.getBoundingClientRect().top + window.pageYOffset;
    const startTop = window.pageYOffset;
    const distance = targetTop - startTop;
    const duration = 420;
    const startTime = performance.now();
    let isCancelled = false;

    function cancelScroll()
    {
        isCancelled = true;
    }

    window.addEventListener("wheel", cancelScroll, { once: true, passive: true });
    window.addEventListener("touchstart", cancelScroll, { once: true, passive: true });

    function scrollStep(currentTime)
    {
        if(isCancelled)
            return;

        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startTop + distance * easedProgress);

        if(progress < 1)
            requestAnimationFrame(scrollStep);
    }

    requestAnimationFrame(scrollStep);
}

function revealIncludeText(textArea, i) 
{
    if (textArea.style.opacity == 0) /* Case: Not currently displaying anything in this text area */
    {
        document.body.style.height = "200vh";
        textArea.innerHTML = IncludeText[i];
        textArea.style.opacity = 1;
        focusContentArea(textArea);
	}
    else  /* Case where area is already displayed some data */
    {
        textArea.style.opacity = 0; 
        setTimeout(function()
        {
			textArea.innerHTML = IncludeText[i];
			textArea.style.opacity = 1;
            focusContentArea(textArea);
		}, TransitionDuration / 2);
    }
    
}

function setActiveNavButton(buttons, activeIndex)
{
    for (let i = 0; i < buttons.length; ++i)
        buttons[i].classList.toggle("kd-button-active", i == activeIndex);
}

/* Called when the DOM content is loaded. */
document.addEventListener('DOMContentLoaded', function()
{
    let textArea = document.getElementById("data_selection_area");
    let buttons = [];
    
    for (let i = 0; i < ContentNames.length; ++i) 
    {
		buttons.push(document.getElementById(ContentNames[i] + "-Button")); /* Add all relevant buttons to array. */
    }
    
    /* Add event listener to buttons for click events */
    for (let i = 0; i < buttons.length; ++i) 
    {
        buttons[i].addEventListener("click", function() 
        {
            if (!buttonLock) 
            {
                if (i != lastButtonIndex) 
                {
                    setActiveNavButton(buttons, i);
					revealIncludeText(textArea, i);
					lastButtonIndex = i;
                    if (textArea.style.minHeight == TextAreaMinHeightClosed || textArea.style.minHeight == "") 
                    {
						textArea.style.minHeight = TextAreaMinHeightExtended;
					}
				}
                else 
                {
                    setActiveNavButton(buttons, -1);
					textArea.innerHTML = "";
					lastButtonIndex = -1;
                    setTimeout(function() 
                    {
                        textArea.style.minHeight = TextAreaMinHeightClosed;
                        textArea.style.opacity = 0;
					}, TransitionDuration / 2);
				}
				buttonLock = true;
                setTimeout(function() 
                {
					buttonLock = false;
				}, TransitionDuration);
			}
		});
	}
});
