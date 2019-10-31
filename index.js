var scene = new THREE.Scene();
var player, pnj, portal, walls, chests, groups;
var lastText = [null, false]

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 4);
renderer.setClearColor("#19b5fe");
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild( renderer.domElement );
let questionId = 0;

var texts = [
    {question: "1 - Who was Napoleon Bonaparte ?", answers: ["He was a Monarch", "He was a President", "He was an Emperor", "He was a God"], goodAnswer: 2},
    {question: "2 - Give the dates of the first world war ?", answers: ["1914-1918", "1913-1919", "1935-1949", "1939-1945"], goodAnswer: 0},
    {question: "3 - Who was Charlemagne ?", answers: ["He was a blacksmith", "He was a king", "He was a servant", "He was a school headmaster"], goodAnswer: 1},
    {question: "4 - Who reigned over ancient Egypt ?", answers: ["the mummies", "Anubis", "The beetles", "the pharaohs"], goodAnswer: 3},
    {question: "5 - What was the nickname of Louis XIV ?", answers: ["The King who is hot", "The Moon King", "The Sun God", "The Sun King"], goodAnswer: 3},
    {question: "6 - When did the battle of Marignan takes place ?", answers: ["1678", "1515", "1789", "1598"], goodAnswer: 1},
    {question: "7 - Who great revolutionary lawyer was guillotined in 1793 ?", answers: ["Merlin", "Robespierre", "Danton", "Arthur"], goodAnswer: 2},
    {question: "8 - how old are Earth ?", answers: ["4,543 billion years", "2019 years", "1,6 billion years", "15 years"], goodAnswer: 0},
    {question: '9 - why did "les poilus" were named like that ?', answers: ["They had no hair", "They couldn't shave their hairs", "They had pets", "They ate their hairs"], goodAnswer: 1},
    {question: "10 - when was the first phone patent filed ?", answers: ["1743", "1926", "1876", "2006"], goodAnswer: 2},
    {question: "11 - who rest below the Triumphal Arch ?", answers: ["The first French President", "The Unknown Soldier", "An animal", "Martin Luther King"], goodAnswer: 1},
    {question: "12 - When did the arrow of Notre Dame de Paris fall ?", answers: ["December 5th", "January 27th", "April 15th", "April 4th"], goodAnswer: 2},
    {question: "13 - Who won the battle of Alesia ?", answers: ["Alesia", "Vercingetorix", "Asterix and Obelix", "Caesar"], goodAnswer: 3},
    {question: "14 - Why did Joan of Arc was burned ?", answers: ["She was considered as a witch", "She was a virgin", "She was a traitor", "She killed someone"], goodAnswer: 0},
    {question: "15 - When did Neil Armstrong walk on the moon ?", answers: ["in 1969", "in 1898", "in 1998", "in 1822"], goodAnswer: 0},
    {question: "16 - When was the writing invented ?", answers: ["about 3500 AC", "The Year 0", "about 3000 BC", "about 500 BC"], goodAnswer: 2},
    {question: "17 - How many years did the Middle Ages last ?", answers: ["about one hundred years", "about ten years", "about five hundred months", "about one thousand years"], goodAnswer: 3},
    {question: "18 - What is the date of the French Revolution ?", answers: ["1492", "1789", "1945", "1818"], goodAnswer: 1},
    {question: "19 - What was the name of the supercontinent that united all the continents", answers: ["Pangea", "Sapiens", "Eurasia", "South Pole"], goodAnswer: 0},
    {question: "20 - Which tower is famous for it inclinaison", answers: ["The Eiffel Tower", "The Tower of Pisa", "Montparnasse Tower", "the Tower of Mordor"], goodAnswer: 1}
];

function createRoom(x, y, z, a) {
    createWallAroundMap(50, 1, 20, 0, x, y - 2, z - 25, 0);
    createWallAroundMap(50, 1, 20, Math.PI / 2, x - 25, y - 2, z, 2);
    createWallAroundMap(50, 1, 20, Math.PI / 2, x + 25, y - 2, z, 3);
    createWallAroundMap(50, 1, 20, 0, x, y - 2, z + 25, 1);
    addPlane(50, 50, x, y - 5, z, -(Math.PI) / 2, "Images/falseroof.jpg", 25);
    addPlane(50, 50, x, y + 8, z, Math.PI / 2, "Images/roog.jpg", 0);
    createLight(x, y + 3, z - 22, (a) ? 0.5 : 0.2, 0, x, y - 19, z - 25.6);
    createLight(x, y + 3, z + 22, (a) ? 0.5 : 0.2, Math.PI, x, y - 19, z + 25.7);
}

function collideBetween(obj1, obj2) {
    var obj1Box = new THREE.Box3().setFromObject(obj1);
    var obj2Box = new THREE.Box3().setFromObject(obj2);
    if (obj1Box.max.x <= obj2Box.max.x + 0.5 && obj1Box.min.x >= obj2Box.min.x - 0.5 && obj1Box.min.z <= obj2Box.max.z + 0.5 && obj1Box.max.z >= obj2Box.min.z - 0.5)
        return (true);
    else
        return (false);
}

function setup() {
    player = new Player();
    walls = [[], [], [], []];
    groups = [];
    chests = [];
    createRoom(0, 0, 0, true);
    createPortal(24.4, -1, 0, 0, -Math.PI / 2, 0, 7, "red", 0);
    createPnj("[BOT] FAIP TIDE", -24, -5.3, 0, Math.PI / 2, 0.035, 0.035, 0.035, {x: -15, y: 1, z: 0, rotx: 0, roty: Math.PI / 2, rotz: 0}, texts[0], {x: -24, y: 3, z: 2, rotx: 0, roty: Math.PI / 2, rotz: 0}, portal, 0);
    animate();
}

function animate() {
    requestAnimationFrame( animate );
    player.move();
    if (lastText[0]) {
        lastText[0].rotation.y += 0.002;
        if (!lastText[1]) {
            lastText[0].position.y += 0.02;
            if (lastText[0].position.y > 1) {
                lastText[1] = true;
                lastText[0].position.y = 1;
            }
        } else {
            lastText[0].position.y -= 0.02;
            if (lastText[0].position.y < -2) {
                lastText[1] = false;
                lastText[0].position.y = -2;
            }
        }
    }
	renderer.render( scene, player.camera );
}

setup();