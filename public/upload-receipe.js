//  image droper

document.getElementById('imageDropArea').addEventListener('click', function() {
    document.getElementById('imageUpload').click();
});

document.getElementById('imageDropArea').addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.borderColor = '#007bff'; // Change border color on drag over
});

document.getElementById('imageDropArea').addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.borderColor = '#ddd'; // Revert border color on drag leave
});

document.getElementById('imageDropArea').addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.borderColor = '#ddd'; // Revert border color on drop

    var files = e.dataTransfer.files;

    // Manually set files for input element (for handling drop)
    var input = document.getElementById('imageUpload');
    var dataTransfer = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
        dataTransfer.items.add(files[i]);
    }

    input.files = dataTransfer.files;
});



// ingrediants

document.getElementById('addIngredientBtn').addEventListener('click', function() {
    var ingredientInput = document.getElementById('ingredientInput');
    var ingredient = ingredientInput.value.trim();

    if (ingredient !== "") {
        var ingredientsList = document.getElementById('ingredientsList');
        var newIngredientItem = document.createElement('li');
        newIngredientItem.innerHTML = ingredient + ' <button type="button" class="remove-btn">Remove</button>';

        ingredientsList.appendChild(newIngredientItem);

        updateIngredientsField();

        ingredientInput.value = ""; // Clear input field
        ingredientInput.focus();    // Set focus back to input
    }
});

document.getElementById('ingredientsList').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-btn')) {
        e.target.parentElement.remove();
        updateIngredientsField();
    }
});

function updateIngredientsField() {
    var ingredients = [];
    document.querySelectorAll('#ingredientsList li').forEach(function(li) {
        ingredients.push(li.textContent.replace(' Remove', ''));
    });
    document.getElementById('ingredientsField').value = ingredients.join(',');
}

// steps of the receipe

document.getElementById('addStepBtn').addEventListener('click', function() {
    const stepInput = document.getElementById('stepInput');
    const stepText = stepInput.value.trim();
    if (stepText) {
        const stepsList = document.getElementById('stepsList');
        const stepItem = document.createElement('li');
        stepItem.textContent = stepText;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', function() {
            stepsList.removeChild(stepItem);
            updateStepsField();
        });
        stepItem.appendChild(removeBtn);
        stepsList.appendChild(stepItem);
        stepInput.value = '';
        updateStepsField();
    }
});

function updateStepsField() {
    const stepsList = document.getElementById('stepsList');
    const steps = Array.from(stepsList.children).map(li => li.textContent.replace('Remove', '').trim());
    document.getElementById('stepsField').value = JSON.stringify(steps);
}

