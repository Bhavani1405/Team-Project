document.addEventListener('DOMContentLoaded', ()=>{
    let dragged=null;
    document.addEventListener('dragstart', e=>{ if(e.target.classList.contains('task-card')){ dragged=e.target; e.dataTransfer.setData('text/plain', e.target.dataset.index); e.target.classList.add('dragging'); }});
    document.addEventListener('dragend', e=>{ if(dragged) dragged.classList.remove('dragging'); dragged=null; });
    const board=document.getElementById('taskBoard');
    if(board){
        board.addEventListener('dragover', e=>{ e.preventDefault(); });
        board.addEventListener('drop', e=>{
            e.preventDefault(); if(!dragged) return;
            const rect=board.getBoundingClientRect(); let y=e.clientY-rect.top; let before=null;
            Array.from(board.children).forEach(child=>{ if(child!==dragged && child.offsetTop<y) before=child; });
            board.insertBefore(dragged, before?before.nextSibling:board.firstChild);
        });
    }
});
