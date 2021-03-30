import * as $ from 'jquery'

function createAnalitics(): object{
    let counter = 0;
    let destroed: boolean = false;

    const listener = (): number => counter++;

    $(document).on('click', listener);
    return {
        destroy() {
            $(document).off('click', listener);
            destroed = true;
        },
        getClick(){
            if(destroed){
                return 'Analitics destroed. Total counter = ${counter}';
            }
            return counter;

        }
    }
}

window['analitics'] = createAnalitics();