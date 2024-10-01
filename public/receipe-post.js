function updateFormAction(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    // Get the value of the search input
    const searchValue = document.getElementById('searchInput').value.trim();

    // Replace ':name' in the form action with the search value
    const form = document.getElementById('searchForm');
    form.action = `/receipe-post.ejs/${encodeURIComponent(searchValue)}`;

    // Submit the form after updating the action
    form.submit();
}
