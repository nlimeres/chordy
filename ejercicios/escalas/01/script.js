const VF = Vex.Flow;

const exercises = [
    { notes: ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'], root: 'Do', type: 'Mayor' },
    { notes: ['a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f/4', 'g/5', 'a/5'], root: 'La', type: 'Menor' }
];

const grid = document.getElementById('exercise-grid');

exercises.forEach((ex, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `card-${i}`;

    const canvasDiv = document.createElement('div');
    canvasDiv.id = `canvas-${i}`;
    canvasDiv.className = 'canvas-container';

    const inputs = document.createElement('div');
    inputs.className = 'inputs';

    const selRoot = document.createElement('select');
    selRoot.id = `root-${i}`;
    ['Tónica', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'].forEach(v => {
        const o = document.createElement('option');
        o.value = v === 'Tónica' ? '' : v;
        o.textContent = v;
        if (v === 'Tónica') { o.disabled = true; o.selected = true; o.hidden = true; }
        selRoot.appendChild(o);
    });

    const selType = document.createElement('select');
    selType.id = `type-${i}`;
    [{v:'', t:'Tipo de escala'}, {v:'Mayor', t:'Mayor'}, {v:'Menor', t:'Menor'}].forEach(q => {
        const o = document.createElement('option');
        o.value = q.v; 
        o.textContent = q.t;
        if (q.v === '') { o.disabled = true; o.selected = true; o.hidden = true; }
        selType.appendChild(o);
    });

    inputs.append(selRoot, selType);
    card.append(canvasDiv, inputs);
    grid.appendChild(card);
    renderMusic(ex, canvasDiv.id);
});

function renderMusic(data, targetId) {
    const div = document.getElementById(targetId);
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    const width = div.offsetWidth || 800;
    renderer.resize(width, 140);
    
    const context = renderer.getContext();
    const stave = new VF.Stave(10, 10, width - 20).addClef("treble").setContext(context).draw();
    
    const notes = data.notes.map(n => {
        const staveNote = new VF.StaveNote({ keys: [n], duration: "w" });
        
        if (n.includes('b')) staveNote.addModifier(new VF.Accidental("b"));
        if (n.includes('#')) staveNote.addModifier(new VF.Accidental("#"));
        
        return staveNote;
    });
    

    const voice = new VF.Voice({ num_beats: 32, beat_value: 4 });
    voice.addTickables(notes);
    
    new VF.Formatter().joinVoices([voice]).format([voice], width - 100);
    voice.draw(context, stave);
}

document.getElementById('btn-check').addEventListener('click', () => {
    exercises.forEach((ex, i) => {
        const sRoot = document.getElementById(`root-${i}`);
        const sType = document.getElementById(`type-${i}`);
        const card = document.getElementById(`card-${i}`);

        const rOk = sRoot.value === ex.root;
        const tOk = sType.value === ex.type;

        sRoot.className = rOk ? 'sel-correct' : 'sel-wrong';
        sType.className = tOk ? 'sel-correct' : 'sel-wrong';
        card.className = (rOk && tOk) ? 'card card-success' : 'card card-error';
    });
});