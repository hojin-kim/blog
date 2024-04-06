var buttonContainer = document.getElementById("scales1");
var buttonContainer2 = document.getElementById("scales2");

generateButtons();
generateButtons2();

function generateButtons() {

    // var buttonContainer = document.getElementById("scales1");

    for (var i = 0; i < 12; i++) {(function (buttonNumber) {
        var button = document.createElement("button");
        button.innerHTML = "a<sub>" + buttonNumber + "</sub>Hz";   

        button.onclick = function() {
            freq = 220*Math.pow(1.5, buttonNumber)
            freq = freq*Math.pow(0.5, Math.floor(buttonNumber/2))
            playTones([freq]);
        };

    
        buttonContainer.appendChild(button);
        })(i);
    }

    var button = document.createElement("button");
    button.innerHTML = "a<sub>12</sub>Hz";
    
    button.onclick = function() {
        playTones([446.0030364990234375]);
    };

    // Append the button to the container
    buttonContainer.appendChild(button);

}

function generateButtons2() {
    // Get the container element
    buttonContainer2 = document.getElementById("scales2");

    // Loop to create 12 buttons
    for (var i = 0; i < 12; i++) {
        (function (buttonNumber) {
            var button = document.createElement("button");
            button.innerHTML = "b<sub>" + buttonNumber + "</sub>Hz";   

            // Add onclick function to each button
            button.onclick = function() {
                // Call the handleButtonClick function with the current button number
                freq = 220*Math.pow(2, buttonNumber/12)
                playTones([freq]);
            };

            // Append the button to the container
            buttonContainer2.appendChild(button);
        })(i); // Pass the current value of i to the IIFE
    }
    var button = document.createElement("button");
        button.innerHTML = "b<sub>12</sub>Hz";          

        // Add onclick function to each button
        button.onclick = function() {
            // Call the handleButtonClick function with the current button number
            playTones([440]);
        };

        // Append the button to the container
    buttonContainer2.appendChild(button);
}

