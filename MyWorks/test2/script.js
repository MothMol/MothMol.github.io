         function Check() {
            let answers=['1','2','3'];//массив с ответами
           
            let questions=3;
            let score=0;
            for(let i=1;i<=answers.length;i++)//создаем цикл от 1 до длины массива answers. Переменная i-будет счетчиком цикла(1,2,3)
        {
            let q = document.getElementById('q'+i);//получаем ссылку на объект table с вопросом
            let a = document.getElementById('a'+i);//получаем ссылку на объект input с ответом пользователя
            if (a.value == answers[i-1]) {//если ответ совпадает с правильным ответом
                q.style.border = '1px solid green ';//окрашиваем табличку с вопросом в зеленый цвет
                score++;//увеличиваем количество правильных ответов
            }
            else {
                q.style.border = '1px solid red';//если ответ не совпадает, то окрашиваем табличку в красный цвет
            }
        }


            document.getElementById('score').innerHTML=score;//находим элемент с id score и меняем его внутреннее содержимое на score


        }