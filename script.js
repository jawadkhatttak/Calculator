const display = document.getElementById('display');
        const themeSwitch = document.querySelector('.switch');
        const buttons = document.querySelectorAll('button');
        
        themeSwitch.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeSwitch.classList.toggle('dark');
        });

        function appendCharacter(char) {
            display.value += char;
        }

        function clearDisplay() {
            display.value = '';
        }

        function deleteLast() {
            display.value = display.value.slice(0, -1);
        }

        function calculate() {
            try {
                const result = eval(display.value.replace('×', '*').replace('÷', '/'));
                display.value = Number.isInteger(result) ? result : result.toFixed(2);
            } catch {
                display.value = 'Error';
                setTimeout(clearDisplay, 1000);
            }
        }

        // Keyboard support
        const keyMapping = {
            'Enter': '=',
            'Escape': 'AC',
            'Backspace': '⌫',
            '/': '÷',
            '*': '×',
            '-': '-',
            '+': '+'
        };

        document.addEventListener('keydown', (event) => {
            const key = event.key;
            let button;

            if (keyMapping[key]) {
                button = Array.from(buttons).find(b => b.textContent === keyMapping[key]);
            } else if (/^[0-9%.]$/.test(key)) {
                button = Array.from(buttons).find(b => b.textContent === key);
            }

            if (button) {
                button.click();
                button.classList.add('active');
                setTimeout(() => button.classList.remove('active'), 100);
            }
        });