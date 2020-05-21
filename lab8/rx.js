const key = prompt("Input Key");
const Request1 = 'https://cloud.iexapis.com/v1/stock/market/batch?symbols=MSFT,INTC,ATVI,EA,GOOGL,AMD,NFLX,TSLA&types=quote&filter=symbol,companyName,latestPrice,change&token=' + key;
const Request2 = 'https://cloud.iexapis.com/v1/stock/market/batch?symbols=MSFT,INTC,ATVI,EA,GOOGL,AMD,NFLX,TSLA&types=quote&filter=latestPrice,change&token=' + key;
let update_time = 0;

function creat_table(data) {
    let table = document.getElementById("Table");

    for (i in data) {
        let tr = document.createElement('tr');
        let z = 0;
        for (j in data[i].quote) {
            let td = document.createElement('td');
            td.textContent = data[i].quote[j] + ((z > 1) ? " $" : "");
            tr.appendChild(td);
            z++;
        }
        table.appendChild(tr);
    }
    document.getElementById('Table').appendChild(table);
}
let request = new XMLHttpRequest();
request.open('GET', Request1, true);
request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        creat_table(JSON.parse(request.response));
        update_time = Date.now();
    }
}
request.send('');

function update_table(data) {
    for (i in data) {
        for (j in data[i].quote) {
            document.getElementById('TableData').querySelector('#' + i + '> #' + j).textContent = data[i].quote[j];
        }
    }

}
let interval$ = rxjs.interval(20000)
    .subscribe(() => {
        request.open('GET', Request2, true);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                update_table(JSON.parse(request.response), Date.now());
                update_time = Date.now();
            }
        }
        request.send('');
        rxjs.interval(100)
            .subscribe(() => { document.getElementById('update').textContent = ((Date.now() - update_time) / 1000).toFixed(1); });
    });