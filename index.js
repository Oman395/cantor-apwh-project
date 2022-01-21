import c from 'canvas';
import fs from 'fs';

const canvas = c.createCanvas(8192,8192);
const ctx = canvas.getContext('2d');

// We will be generating a Cantor Square fractal
// This will be created by making a large cross, then in each whitespace another cross
// We can continue this for a while lol

let whiteSpaces = [];
for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
        whiteSpaces.push({
            x: i * (canvas.width / 4),
            y: j * (canvas.height / 4),
            width: canvas.width / 4,
            height: canvas.height / 4
        });
    }
}
let loopCount = 0;

function loop() {
    if(loopCount > 8) return; 
    let nWhitespaces = []; 
    whiteSpaces.forEach((whitespace, index) => { 
        // Create a new cross 
        let radialGrad = ctx.createRadialGradient(whitespace.x + whitespace.width / 2, whitespace.y + whitespace.height / 2, 0, whitespace.x + whitespace.width / 2, whitespace.y + whitespace.height / 2, whitespace.width / 2);
        radialGrad.addColorStop(0, '#0ff');
        radialGrad.addColorStop(1, '#0af');
        ctx.fillStyle = radialGrad;
        ctx.fillRect(whitespace.x, whitespace.y, whitespace.width, whitespace.height);
        // I'm going to test if the whitespaces are in correct space for now 
        // We need 4 new whitespaces, in the corners left empty by the cross (top left, top right, bottom left, bottom right)
        nWhitespaces.push({
            x: whitespace.x,
            y: whitespace.y,
            width: whitespace.width / 3,
            height: whitespace.height / 3
        });
        nWhitespaces.push({
            x: whitespace.x + (whitespace.width / 3) * 2,
            y: whitespace.y,
            width: whitespace.width / 3,
            height: whitespace.height / 3
        });
        nWhitespaces.push({
            x: whitespace.x,
            y: whitespace.y + (whitespace.height / 3) * 2,
            width: whitespace.width / 3,
            height: whitespace.height / 3
        });
        nWhitespaces.push({
            x: whitespace.x + (whitespace.width / 3) * 2,
            y: whitespace.y + (whitespace.height / 3) * 2,
            width: whitespace.width / 3,
            height: whitespace.height / 3
        });
    });
    console.log(`${loopCount / 8 * 100}%`)
    whiteSpaces = nWhitespaces;
    loopCount++;
    return loop();
}
loop();

fs.writeFileSync('cantor.png', canvas.toBuffer());
