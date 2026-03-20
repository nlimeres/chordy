const VF = Vex.Flow;

const intervalData = [
    { notes: ['d/4', 'b/4'], num: '6', quality: 'M' }, 
    { notes: ['b/4', 'a/5'], num: '7', quality: 'm' },
    { notes: ['g/3', 'b/3'], num: '3', quality: 'M' },
    { notes: ['d/4', 'b/4'], num: '6', quality: 'M' },
    { notes: ['c/4', 'a/4'], num: '6', quality: 'M' },
    { notes: ['g/4', 'b/4'], num: '3', quality: 'M' },
    { notes: ['d/4', 'g/4'], num: '4', quality: 'J' },
    { notes: ['f/4', 'd/5'], num: '6', quality: 'M' },
    { notes: ['g/3', 'b/4'], num: '10', quality: 'M' },
    { notes: ['f/4', 'g/4'], num: '2', quality: 'M' },
    { notes: ['f/4', 'f/5'], num: '8', quality: 'J' },
    { notes: ['g/3', 'b/4'], num: '10', quality: 'M' }
];

const grid = document.getElementById('exercise-grid');

function init() {
    intervalData.forEach((data, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${i}`;

        const canvasDiv = document.createElement('div');
        canvasDiv.id = `canvas-${i}`;
        canvasDiv.className = 'canvas-container';

        const inputsDiv = document.createElement('div');
        inputsDiv.className = 'inputs';

        const selNum = document.createElement('select');
        selNum.id = `num-${i}`;
        ['Grado', '2', '3', '4', '5', '6', '7', '8', '9', '10'].forEach(v => {
            const opt = document.createElement('option');
            opt.value = v === 'Grado' ? '' : v;
            opt.textContent = v === 'Grado' ? v : v + 'ª';
            selNum.appendChild(opt);
        });

        const selQual = document.createElement('select');
        selQual.id = `qual-${i}`;
        const qualities = [
            {v: '', t: 'Especie'},
            {v: 'M', t: 'Mayor'},
            {v: 'm', t: 'Menor'},
            {v: 'J', t: 'Justa'},
            {v: 'A', t: 'Aumentada'},
            {v: 'd', t: 'Disminuida'}
        ];
        qualities.forEach(q => {
            const opt = document.createElement('option');
            opt.value = q.v; opt.textContent = q.t;
            selQual.appendChild(opt);
        });

        inputsDiv.append(selNum, selQual);
        card.append(canvasDiv, inputsDiv);
        grid.appendChild(card);

        renderMusic(data, canvasDiv.id);
    });
}

function renderMusic(data, targetId) {
    const div = document.getElementById(targetId);
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(180, 120);
    const context = renderer.getContext();
    const stave = new VF.Stave(10, 0, 160).addClef("treble").setContext(context).draw();

    const notes = [
        new VF.StaveNote({ keys: [data.notes[0]], duration: "w" }),
        new VF.StaveNote({ keys: [data.notes[1]], duration: "w" })
    ];

    const voice = new VF.Voice({ num_beats: 8, beat_value: 4 });
    voice.addTickables(notes);
    new VF.Formatter().joinVoices([voice]).format([voice], 100);
    voice.draw(context, stave);
}

document.getElementById('btn-check').addEventListener('click', () => {
    intervalData.forEach((data, i) => {
        const selNum = document.getElementById(`num-${i}`);
        const selQual = document.getElementById(`qual-${i}`);
        const card = document.getElementById(`card-${i}`);

        const isNumCorrect = selNum.value === data.num;
        const isQualCorrect = selQual.value === data.quality;

        selNum.className = '';
        selQual.className = '';
        card.className = 'card';

        selNum.classList.add(isNumCorrect ? 'select-correct' : 'select-wrong');

        selQual.classList.add(isQualCorrect ? 'select-correct' : 'select-wrong');

        if (isNumCorrect && isQualCorrect) {
            card.classList.add('card-success');
        } else {
            card.classList.add('card-error');
        }
    });
});

window.onload = init;