const VF = Vex.Flow;

const exercises = [
    { notes: ['d#/4', 'g/4'], num: '3', qual: 'm' }, 
    { notes: ['eb/4', 'f/4'], num: '2', qual: 'M' },
    { notes: ['a/4', 'db/4'], num: '2', qual: 'm' },
    { notes: ['f#/4', 'bn/3'], num: '8', qual: 'J' },
    { notes: ['b/4', 'd/4'], num: '4', qual: 'aum' },
    { notes: ['e/5', 'f/4'], num: '7', qual: 'M' },
    { notes: ['g/4', 'a/4'], num: '2', qual: 'M' },
    { notes: ['f/4', 'b/3'], num: '5', qual: 'dim' }
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

    const selNum = document.createElement('select');
    selNum.id = `num-${i}`;
    ['Num', '2', '3', '4', '5', '6', '7', '8'].forEach(v => {
        const o = document.createElement('option');
        o.value = v === 'Num' ? '' : v;
        o.textContent = v === 'Num' ? v : v + 'ª';
        if (v === 'Num') {
            o.disabled = true;
            o.selected = true;
            o.hidden = true;
        }
        selNum.appendChild(o);
    });

    const selQual = document.createElement('select');
    selQual.id = `qual-${i}`;
    [{v:'', t:'Especie'}, {v:'M', t:'Mayor'}, {v:'m', t:'Menor'}, {v:'J', t:'Justa'}, {v:'aum', t:'Aumentada'}, {v:'dim', t:'Disminuida'}].forEach(q => {
        const o = document.createElement('option');
        o.value = q.v; 
        o.textContent = q.t;
        if (q.v === '') {
            o.disabled = true; 
            o.selected = true;
            o.hidden = true;
        }
        selQual.appendChild(o);
    });

    inputs.append(selNum, selQual);
    card.append(canvasDiv, inputs);
    grid.appendChild(card);
    renderMusic(ex, canvasDiv.id);
});

function renderMusic(data, targetId) {
    const div = document.getElementById(targetId);
    div.innerHTML = ''; 
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(150, 120);
    const context = renderer.getContext();
    const stave = new VF.Stave(10, 0, 130).addClef("treble").setContext(context).draw();
    
    const notes = data.notes.map(key => {
        const cleanKey = key.replace('n', ''); 

        const note = new VF.StaveNote({ keys: [cleanKey], duration: "w" });
    
        if (key.includes('#')) {
            note.addModifier(new VF.Accidental("#"), 0);
        } else if (key.includes('b')) {
            note.addModifier(new VF.Accidental("b"), 0);
        } else if (key.includes('n')) {
            note.addModifier(new VF.Accidental("n"), 0);
        }
        
        return note;
    });
    
    const voice = new VF.Voice({ num_beats: 8, beat_value: 4 });
    voice.addTickables(notes);
    new VF.Formatter().joinVoices([voice]).format([voice], 80);
    voice.draw(context, stave);
}

document.getElementById('btn-check').addEventListener('click', () => {
    exercises.forEach((ex, i) => {
        const sNum = document.getElementById(`num-${i}`);
        const sQual = document.getElementById(`qual-${i}`);
        const card = document.getElementById(`card-${i}`);

        const nOk = sNum.value === ex.num;
        const qOk = sQual.value === ex.qual;

        sNum.className = nOk ? 'sel-correct' : 'sel-wrong';
        sQual.className = qOk ? 'sel-correct' : 'sel-wrong';
        card.className = (nOk && qOk) ? 'card card-success' : 'card card-error';
    });
});