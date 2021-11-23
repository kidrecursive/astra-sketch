const topicAdjectives = [
    "Sketchy",
    "Serverless",
    "Chaos",
    "Streaming",
];

const topicNouns = [
    "Deployment",
    "Server",
    "Cloud",
    "Database",
    "DevOps",
    "Monkey",
    "Pulsar",
    "Cassandra",
    "Astronaut"
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function generate() {
    let noun = topicNouns[getRandomInt(topicNouns.length)];
    let adj = topicAdjectives[getRandomInt(topicAdjectives.length)];
    return adj + " " + noun;
}

function generateTopic(existing) {
    let topic;
    while (true) {
        topic = generate();
        if (existing && existing.includes(topic)) {
            continue;
        }
        break;
    } 
    return topic;
}

module.exports.generateTopic = generateTopic;