function shuffle(list) {
    for (let i = 0; i < list.length; i += 1) {
        let j = Math.round(Math.random() * i);
        let aj = list[j];
        let ai = list[i];
        list[j] = ai;
        list[i] = aj;
    }
}


module.exports = {
    shuffle
};