<template>
    <h1>API Help</h1>
    
    <div class="centeredContent">
        <p>Unfortunately, this website doesn't really have an API.</p>
        <p>Everything is done client side, the only thing the server does is hosting static files.</p>
        <br>
        <h3>There are however a few endpoints that could help you:</h3>
    </div>
    <div class="tablewrapper">
            <table>
                <tr>
                    <th style="width: 150px">Endpoint</th>
                    <th style="width: 105px">Implemented</th>
                    <th>Response</th>
                </tr>
                <tr class="odd">
                    <td>/servers.json</td>
                    <td class="red">No</td>
                    <td>Returns a json with a list of all servers.</td>
                </tr>
                <tr>
                    <td>/server/data.json</td>
                    <td class="orange">Partially</td>
                    <td>Returns a json with a list of all maps for a certain server.</td>
                </tr>
                <tr class="odd">
                    <td>/server/allmaps.zip</td>
                    <td class="green">Yes</td>
                    <td>Returns a zip with all of the maps for a certain server.</td>
                </tr>
                <tr>
                    <td>/server/allthumbs.zip</td>
                    <td class="red">No</td>
                    <td>Returns a zip with all of the thumbnails for a certain server.</td>
                </tr>
                <tr class="odd lasttr">
                    <td>/server/all.zip</td>
                    <td class="red">No</td>
                    <td>Returns a zip with all of the thumbnails and maps for a certain server.</td>
                </tr>
            </table>
        </div>     
</template>

<style scoped>
.orange {
    background-color: #ffc35340;
}
.red {
    background-color: #ff535340;
}
.green {
    background-color: #25c41440;
}
.tablewrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: left;
}
table {
    width: fit-content;
    max-width: 90%;
    border-spacing:0;
    border-collapse: collapse; 
}
td {
    overflow: auto;
}

/* tr:not(.lasttr) {
    border-bottom: 1px solid #ffffff48;
} */
td:first-child, th:first-child {
    border-left: 1px solid #ffffff48;
}
td:last-child, th:last-child {
    border-right: 1px solid #ffffff48;
}
tr:first-child {
    border-top: 1px solid #ffffff48;
}
tr:last-child,
tr:first-child {
    border-bottom: 1px solid #ffffff48;
}
.odd {
    background-color: rgba(104, 104, 104, 0.186);
}


p {
    margin: 0;
}
h1 {
    margin-bottom: 10px;
}
h2,
h3 {
    margin: 0;
}
.centeredContent {
    display: inline-block;
    width: fit-content;
    text-align: left;
}
</style>