import Card from './card';
import Column from './column';
import locStorage from './locStorage';
// localStorage.clear()
locStorage('.column');

window.onload = function() {
    const column = new Column('.columns');

    const card = new Card('.columns');
}