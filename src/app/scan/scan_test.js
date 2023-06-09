var selDiv = "";
var storedFiles = [];

$(document).ready(function () {
    selDiv = $("#selectedFiles");
    $("body").on("click", ".selFile", editFiles);
});

var start = function () {
    var i = 0;

    var wsImpl = window.WebSocket || window.MozWebSocket;

    window.ws = new wsImpl('ws://localhost:8181/');
    ws.onmessage = function (e) {
        if (typeof e.data === "string") {
            //IF Received Data is String
        }
        else if (e.data instanceof ArrayBuffer) {
            //IF Received Data is ArrayBuffer
        }
        else if (e.data instanceof Blob) {

            i++;

            var f = e.data;

            f.name = "File" + i;

            storedFiles.push(f);

            var reader = new FileReader();

            reader.onload = function (e) {
                var html = "<div class=\"col-sm-2 text-center\" style=\"border: 1px solid black; margin-left: 2px;\"><img height=\"200px\" width=\"200px\" src=\"" + e.target.result + "\" data-file='" + f.name + "' class='selFile' title='Click to remove'><br/>" + i + "</div>";
                selDiv.append(html);

            }
            reader.readAsDataURL(f);
        }
    };
    ws.onopen = function () {
        //Do whatever u want when connected succesfully
    };
    ws.onclose = function () {
        $('.dalert').modal('show');
    };
}
window.onload = start;

function scanImage() {
    ws.send("1100");
};

function editFiles(e) {
    var file = $(this).data("file");
    for (var i = 0; i < storedFiles.length; i++) {
        if (storedFiles[i].name === file) {
            $('.scandetail').modal('show');
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            var img = new Image();
            img.src = window.URL.createObjectURL(storedFiles[i]);
            img.onload = function () {
                c.width = img.width;
                c.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
            }
            break;

        }
    }
};
