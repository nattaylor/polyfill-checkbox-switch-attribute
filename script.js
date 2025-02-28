(function () {
    // Process all switch inputs
    function setupSwitches() {
      // Find all checkbox inputs with the switch attribute
      const switchInputs = document.querySelectorAll('input[type="checkbox"][switch]');
  
      // Process each switch input
      switchInputs.forEach((input) => {
        // Ensure each input has an ID
        if (!input.id) {
          input.id = "switch-" + Math.random().toString(36).substr(2, 9);
        }
  
        // If no label exists for this input, create one
        let label = document.querySelector(`label[for="${input.id}"]`);
        if (!label) {
          label = document.createElement("label");
          label.setAttribute("for", input.id);
          input.parentNode.insertBefore(label, input.nextSibling);
        }
      });
    }
  
    // Run setup when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupSwitches);
    } else {
      setupSwitches();
    }
  
    // Handle dynamically added switches
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const newSwitches = Array.from(mutation.addedNodes)
            .filter((node) => node.nodeType === 1) // Element nodes only
            .flatMap((node) => {
              if (node.matches && node.matches('input[type="checkbox"][switch]')) {
                return [node];
              }
              if (node.querySelectorAll) {
                return Array.from(node.querySelectorAll('input[type="checkbox"][switch]'));
              }
              return [];
            });
  
          if (newSwitches.length > 0) {
            setupSwitches();
          }
        }
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
    (function () {
      const styleElement = document.createElement("style");
      styleElement.textContent = `
            /* Hide the default checkbox appearance */
            input[type="checkbox"][switch] {
              position: absolute;
              opacity: 0;
              width: 0;
              height: 0;
            }
  
            /* Create the toggle switch container */
            input[type="checkbox"][switch] + label {
              position: relative;
              display: inline-block;
              width: 50px;
              height: 26px;
              background-color: var(--switch-color-off, gray);
              border-radius: 13px;
              cursor: pointer;
              transition: background-color 0.3s;
            }
  
            /* Create the toggle switch knob */
            input[type="checkbox"][switch] + label::before {
              content: '';
              position: absolute;
              left: 3px;
              top: 3px;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background-color: white;
              transition: transform 0.3s;
            }
  
            /* Style for the checked state */
            input[type="checkbox"][switch]:checked + label {
              background-color: var(--switch-color-on, dodgerblue);
            }
  
            input[type="checkbox"][switch]:checked + label::before {
              transform: translateX(24px);
            }
  
            /* Focus styles for accessibility */
            input[type="checkbox"][switch]:focus + label {
              box-shadow: 0 0 0 2px rgba(107, 74, 160, 0.3);
            }
  
            /* Disabled state styles */
            input[type="checkbox"][switch]:disabled + label {
              opacity: 0.6;
              cursor: not-allowed;
            }
          `;
      document.head.appendChild(styleElement);
    })();
  })();
  