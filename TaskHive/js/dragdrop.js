const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');

let draggedCard = null;

// Add drag events for each card
cards.forEach(card => {
    card.addEventListener('dragstart', () => {
        draggedCard = card;
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        draggedCard = null;
        card.classList.remove('dragging');
    });
});

// Allow dropping in lists
lists.forEach(list => {
    list.addEventListener('dragover', e => {
        e.preventDefault(); // Necessary to allow drop

        const afterElement = getDragAfterElement(list, e.clientY);
        if (afterElement == null) {
            list.appendChild(draggedCard);
        } else {
            list.insertBefore(draggedCard, afterElement);
        }
    });
});

// Helper function to determine where to insert card
function getDragAfterElement(list, y) {
    const draggableElements = [...list.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
