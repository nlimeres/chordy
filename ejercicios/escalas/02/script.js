const VF = Vex.Flow;

const exercises = [
    { key: 'Bm', notes: ['b/3', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'], root: 'Do', type: 'Mayor' },
    { key: 'G', notes: ['g/4', 'a/4', 'b/4', 'c/5', 'd/5', 'e/5', 'f/5', 'g/5'], root: 'Sol', type: 'Mayor' },
    { key: 'F', notes: ['f/4', 'g/4', 'a/4', 'b/4', 'c/5', 'd/5', 'e/5', 'f/5'], root: 'Fa', type: 'Mayor' },
    { key: 'D', notes: ['d/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5', 'd/5'], root: 'Re', type: 'Mayor' }
];

const grid = document.getElementById('exercise-grid');

exercises.forEach((ex, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `card-${i}`;

    card.innerHTML = `
        <div id="canvas-${i}" class="canvas-container"></div>
        <div class="inputs">
            <select id="root-${i}">
                <option value="" disabled selected hidden>Tónica</option>
                <option value="Do">Do</option>
                <option value="Re">Re</option>
                <option value="Mi">Mi</option>
                <option value="Fa">Fa</option>
                <option value="Sol">Sol</option>
                <option value="La">La</option>
                <option value="Si">Si</option>
            </select>
            <select id="type-${i}">
                <option value="" disabled selected hidden>Tipo</option>
                <option value="Mayor">Mayor</option>
                <option value="Menor">Menor Natural</option>
            </select>
        </div>
    `;
    grid.appendChild(card);
});

function renderAll() {
    exercises.forEach((ex, i) => {
        try {
            const div = document.getElementById(`canvas-${i}`);
            const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
            const width = div.offsetWidth || 800;
            renderer.resize(width, 130);
            
            const context = renderer.getContext();
            const stave = new VF.Stave(10, 0, width - 20);
            
            stave.addClef("treble").addKeySignature(ex.key);
            stave.setContext(context).draw();

            const notes = ex.notes.map(n => new VF.StaveNote({ keys: [n], duration: "w" }));
            
            const voice = new VF.Voice({ num_beats: 32, beat_value: 4 });
            voice.addTickables(notes);

            new VF.Formatter().joinVoices([voice]).formatToStave(stave);
            voice.draw(context, stave);
        } catch (err) {
            console.error("Error dibujando la escala " + i, err);
        }
    });
}

window.onload = renderAll;

document.getElementById('btn-check').addEventListener('click', () => {
    exercises.forEach((ex, i) => {
        const sRoot = document.getElementById(`root-${i}`);
        const sType = document.getElementById(`type-${i}`);
        const card = document.getElementById(`card-${i}`);

        const rOk = sRoot.value === ex.root;
        const tOk = sType.value === ex.type;

        sRoot.className = rOk ? 'sel-correct' : 'sel-wrong';
        sType.className = tOk ? 'sel-correct' : 'sel-wrong';

        if (rOk && tOk) {
            card.className = 'card card-success';
        } else {
            card.className = 'card card-error';
        }
    });
});