document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".documentation-form");
    const button = document.querySelector("#button-reset");
    const note = document.getElementById("note");
    const copyButton = document.querySelector("#button-copy");

    form.addEventListener("change", updateNote);
    form.addEventListener("input", updateNote);

    button.addEventListener("click", (e) => {
        e.preventDefault();
        form.reset();
        note.innerHTML = '';
    });

    copyButton.addEventListener("click", (e) => {
        e.preventDefault();
        copyToClipboard(note.textContent);
    });

    function updateNote() {
        let noteContent = '';

        // Iterate through all form inputs
        form.querySelectorAll('input').forEach(input => {
            if (input.type === 'radio' && input.checked) {
                noteContent += `${input.closest('.form-div').querySelector('label').textContent} ${input.nextElementSibling.textContent.trim()}.<br>`;
            } else if (input.type === 'text' && input.value) {
                let labelText = input.closest('.form-div').querySelector('label').textContent;
                let valueText = input.value;
                if (input.id === 'APD2') {
                    valueText = formatCurrency(valueText);
                }
                noteContent += `${labelText} ${valueText}.<br>`;
            }
        });

        note.innerHTML = noteContent.trim();
    }

    function formatCurrency(value) {
        // Remove commas and then format the number
        value = value.replace(/,/g, '');
        if (!isNaN(value) && value.length > 0) {
            return '$' + parseFloat(value).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 3
            });
        }
        return value;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Note copied to clipboard!');
        }).catch(err => {
            console.error('Error copying to clipboard: ', err);
        });
    }
});
