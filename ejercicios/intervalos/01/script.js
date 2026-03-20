const VF = Vex.Flow;

const exercises = [
    { notes: ['d/4', 'g/4'], correctNum: '4', correctQual: 'J', key: 'C' },
    { notes: ['f/4', 'b/4'], correctNum: '4', correctQual: 'A', key: 'C' },
    { notes: ['bb/4', 'd/5'], correctNum: '3', correctQual: 'M', key: 'C', accidentals: [ {idx: 0, type: 'b'} ] },
    { notes: ['g/4', 'eb/5'], correctNum: '6', correctQual: 'm', key: 'C', accidentals: [ {idx: 1, type: 'b'} ] },
    
    { notes: ['f/4', 'b/4'], correctNum: '4', correctQual: 'J', key: 'D' },
    { notes: ['a/4', 'g/5'], correctNum: '7', correctQual: 'm', key: 'D', accidentals: [ {idx: 1, type: 'n'} ] },
    { notes: ['d/5', 'g#/5'], correctNum: '4', correctQual: 'A', key: 'D', accidentals: [ {idx: 1, type: '#'} ] },
    { notes: ['e/4', 'e/5'], correctNum: '8', correctQual: 'J', key: 'D' }
];

const degreeOptions = ['Grado', '2', '3', '4', '5', '6', '7', '8'];
const qualityOptions = [
    { val: '', text: 'Especie' },
    { val: 'M', text: 'Mayor' },
    { val: 'm', text: 'Menor' },
    { val: 'J', text: 'Justa' },
    { val: 'A', text: 'Aumentada' },
    { val: 'd', text: 'Disminuida' }
];

const container = document.getElementById('exercise-container');

exercises.forEach((ex, index) => {
    const box = document.createElement('div');
    box.className = 'interval-box';
    box.id = `box-${index}`;

    const canvasDiv = document.createElement('div');
    canvasDiv.className = 'canvas-wrapper';
    canvasDiv.id = `canvas-${index}`;

    const selectGroup = document.createElement('div');
    selectGroup.className = 'select-group';

    const selectNum = document.createElement('select');
    selectNum.id = `select-num-${index}`;
    degreeOptions.forEach(opt => {
        const o = document.createElement('option');
        o.value = opt === 'Grado' ? '' : opt;
        o.innerText = opt === 'Grado' ? opt : opt + 'ª';
        selectNum.appendChild(o);
    });

    const selectQual = document.createElement('select');
    selectQual.id = `select-qual-${index}`;
    qualityOptions.forEach(opt => {
        const o = document.createElement('option');
        o.value = opt.val;
        o.innerText = opt.text;
        selectQual.appendChild(o);
    });

    selectGroup.appendChild(selectNum);
    selectGroup.appendChild(selectQual);
    
    box.appendChild(canvasDiv);
    box.appendChild(selectGroup);
    container.appendChild(box);

    renderInterval(ex, `canvas-${index}`);
});

function renderInterval(data, elementId) {
    const div = document.getElementById(elementId);
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(150, 120);
    const context = renderer.getContext();

    const stave = new VF.Stave(0, 0, 140);
    stave.addClef("treble");
    if (data.key !== 'C') {
        stave.addKeySignature(data.key);
    }
    stave.setContext(context).draw();

    const notes = [
        new VF.StaveNote({ keys: [data.notes[0]], duration: "w", clef: "treble" }),
        new VF.StaveNote({ keys: [data.notes[1]], duration: "w", clef: "treble" })
    ];

    if (data.accidentals) {
        data.accidentals.forEach(acc => {
            notes[acc.idx].addModifier(new VF.Accidental(acc.type));
        });
    }

    const voice = new VF.Voice({ num_beats: 8, beat_value: 4 }); 
    voice.addTickables(notes);

    new VF.Formatter().joinVoices([voice]).format([voice], 80);
    voice.draw(context, stave);
}

document.getElementById('check-btn').addEventListener('click', () => {
    exercises.forEach((ex, index) => {
        const selNum = document.getElementById(`select-num-${index}`);
        const selQual = document.getElementById(`select-qual-${index}`);
        const box = document.getElementById(`box-${index}`);
        
        const numCorrect = selNum.value === ex.correctNum;
        const qualCorrect = selQual.value === ex.correctQual;

        selNum.className = '';
        selQual.className = '';
        box.className = 'interval-box';

        selNum.classList.add(numCorrect ? 'select-success' : 'select-error');

        selQual.classList.add(qualCorrect ? 'select-success' : 'select-error');

        if (numCorrect && qualCorrect) {
            box.classList.add('box-success');
        } else {
            box.classList.add('box-error');
        }
    });
});