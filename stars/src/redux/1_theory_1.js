/**
 * Преимущества
 * 
 * При таком подходе у приложения появляется единый «источник правды»
 * для его полного состояния в каждый момент времени.
 * Каждому моменту времени соответствует определённое состояние,
 * и с помощью Redux и инструментов отладки можно «путешествовать во времени».
 * Это бывает полезно при исправлении ошибок.
 * Если ошибка возникает, можно легко восстановить полное состояние хранилища и воспроизвести её.
 * Если информация «размазана» по внутренним состояниям отдельных компонентов приложения,
 * это сделать сложнее. По этой же причине в Redux-приложениях легче писать юнит-тесты.
 */

/**
 * Недостатки и альтернативы
 * Для использования библиотеки обычно приходится писать много однотипного кода, на сленге — бойлерплейта.
 * В проекте быстро разрастается число экшенов и их типов, а также самих редьюсеров и других вспомогательных сущностей.
 * Но из-за того, что принципы Redux полезны для крупных проектов с большим количеством изменяющихся данных,
 * периодически появляются альтернативные, упрощённые реализации.
 * Например, Redux Toolkit призван сократить количество однотипного кода.
 */

/**
 * Принцип работы Redux
 * 
 * Суть Redux — в создании единого «источника истины» для приложения и удобного доступа к данным в хранилище на любом уровне приложения.
 * 
 * Вот так работает Redux:
 *      экшен отправляется при помощи dispatch в стор, а редьюсер создаёт новый объект стора,
 *      чтобы разработчик получил к нему доступ и изменил представление (View).
 * 
 * Экшен (англ. action, «действие») — способ внести изменения в хранилище (store).
 *      Хранилище никогда не изменяется напрямую. Для этого и нужен экшен.
 *      Он представляет собой JavaScript-объект, который всегда должен иметь ключ type.
 *      Экшен также может содержать дополнительные данные.
 * 
 *      Экшен отправляется (англ. dispatch) в хранилище с помощью метода store.dispatch.
 *      Для удобства работы с store.dispatch разработчики ввели новое понятие — генераторы экшенов (action creators).
 *      Они представляют собой функции, которые возвращают экшены. Часто путают термины action и action creator, но разницу легко запомнить:
            // Это action
            {
                type: 'FEEDBACK_FORM_SET_VALUE',
                text: 'Рейв был очень уютным и культурным. Спасибо организаторам! Приду ещё!'
            }

            // А вот это генератор экшена
            function setFeedBackFormValue(text){
                return {
                    type: 'FEEDBACK_FORM_SET_VALUE',
                    text
                }
            }
* Редьюсеры. Редьюсер (от англ. reduce, «свёртывать») — функция-обработчик,
* которая создаёт новый объект хранилища в зависимости от типа экшена и данных в нём. Редьюсер должен описать сам разработчики.
*
* После окончания работы редьюсера новое значение, которое он вернул, заменяет текущее значение хранилища,
* и вызываются функции-обработчики. Предварительно эти функции нужно установить с помощью метода store.subscribe.
* Таким образом, разработчик получает доступ к новому значению хранилища и может произвести изменения в DOM
*/

/**
 * Иммутабельное хранилище.
 * 
 * Важнейшая концепция Redux — неизменяемость, или иммутабельность (англ. immutability), объекта хранилища.
 * Это означает, что при любом изменении данных в хранилище вместо внесения изменений в существующий объект
 * на его основе создаётся новая, изменённая копия. Чаще всего для этого используется spread-оператор, и методы массивов типа map.
 * 
 * При таком подходе можно легко определить, изменились ли данные: достаточно сравнить newStore === store.
 * Также можно вести историю изменений и, если нужно, «откатиться» к предыдущей версии. Это бывает полезно при отладке приложения.
 */