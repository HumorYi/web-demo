window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
    canvasApp();
}

function canvasApp() {

    /*-----------------------------------------------------------------------------------------------*/
    /*---------------------------var-----------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/

    var theCanvas = document.getElementById("canvasOne"),
        context = theCanvas.getContext("2d"),
        //��Բ����
        ovalTrackSize = [300, 255],
        //���е㼯��
        ovalTrackTotal = [],
        //��ʼ�㣬��Ϊ���飬�������ɫ
        startPoints = [10, 200, 600, 700, 900, 1100],
        //�̶�ɫ������
        colorGroupSecond = [327, '90%', '83%', 0, 5],
        //�����μ��ϣ���������ʼ�����
        triangleGroup = [],
        colorGroupOne = [
            [320, '90%', '68%'],
            [320, '91%', '74%'],
            [310, '100%', '83%'],
            [320, '89%', '72%']
        ];
    colorGroupOne.push([327, '83%', '46%', 0.5]); //0.5
    colorGroupOne.push([327, '83%', '47%', 0.3]); //0.3
    colorGroupOne.push([327, '83%', '46%', 0.5]);
    colorGroupOne.push([327, '83%', '46%', 0.3]);

    //������Ƿ�֧��
    supported = true;
    //�ƶ�������
    //context.globalAlpha = 0.5;
    context.translate(100, 100);
    context.scale(.3, .3);
    //�ƶ�������

    /*-----------------------------------------------------------------------------------------------*/
    /*----------------------------Function------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------*/

    var
        clear = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        },
        //������Բ���е�ļ���
        calculateTrack = function() {
            var a = ovalTrackSize[0];
            var b = ovalTrackSize[1];

            for (var i = a; i > -a; i = i - 1) {
                ovalTrackTotal.push([i, -Math.sqrt(Math.pow(a, 2) * Math.pow(b, 2) - Math.pow(b, 2) * Math.pow(i, 2)) / a]);
            }
            for (var i = -a; i <= a; i = i + 1) {
                ovalTrackTotal.push([i, Math.sqrt(Math.pow(a, 2) * Math.pow(b, 2) - Math.pow(b, 2) * Math.pow(i, 2)) / a]);
            }
            // //debug
            // document.write("�켣��ĸ���Ϊ<h3>"+ovalTrackTotal.length+"</h3>")
            // for(var c in ovalTrackTotal){
            // 	document.write(ovalTrackTotal[c]+"<br />");
            // }
        },
        //��������������Բx���ʼ����
        calulateStartGroupX = function() {
            //��1
            triangleGroup = [];
            triangleGroup.push([startPoints[4], startPoints[0], startPoints[5]]);
            triangleGroup.push([startPoints[4], startPoints[1], startPoints[0]]);
            triangleGroup.push([startPoints[4], startPoints[2], startPoints[1]]);
            triangleGroup.push([startPoints[4], startPoints[3], startPoints[2]]);
            //��2
            triangleGroup.push([startPoints[1], startPoints[0], startPoints[2]]);
            triangleGroup.push([startPoints[1], startPoints[0], startPoints[3]]);
            triangleGroup.push([startPoints[1], startPoints[0], startPoints[5]]);
            triangleGroup.push([startPoints[2], startPoints[3], startPoints[5]]);


            //				//debug
            //				document.write("<h1>"+triangleGroup.length+"����������ʼ�����<br /></h1>");
            //				for(var c in triangleGroup){
            //					document.write(c+":"+triangleGroup[c]+"<br />");
            //				}

        },
        calulateStartGroupXY = function() {
            for (var c in triangleGroup) {
                triangleGroup[c][0] = ovalTrackTotal[triangleGroup[c][0]];
                triangleGroup[c][1] = ovalTrackTotal[triangleGroup[c][1]];
                triangleGroup[c][2] = ovalTrackTotal[triangleGroup[c][2]];
            }
        },
        calulateColorUpdate = function() {

            for (var c in colorGroupOne) {

                if (colorGroupOne[c][0] <= 360) {
                    colorGroupOne[c][0] = colorGroupOne[c][0] + 1;
                } else {
                    colorGroupOne[c][0] = 0;
                }
            }

        },
        calculatePointsUpdate = function() {
            for (var num in startPoints) {
                if (startPoints[num] >= 1) {
                    startPoints[num] = startPoints[num] - 1;
                } else {
                    startPoints[num] = 1200
                }
            }

        },
        draw = function() {

            for (var i = 0; i < 4; i++) {
                context.lineWidth = 0;
                context.beginPath();
                context.moveTo(triangleGroup[i][0][0], triangleGroup[i][0][1]);
                context.lineTo(triangleGroup[i][1][0], triangleGroup[i][1][1]);
                context.lineTo(triangleGroup[i][2][0], triangleGroup[i][2][1]);
                context.lineTo(triangleGroup[i][0][0], triangleGroup[i][0][1]);
                context.closePath();
                context.fillStyle = "hsl(" + colorGroupOne[i][0] + "," + colorGroupOne[i][1] + "," + colorGroupOne[i][2] + ")";
                context.fill();
            }
            for (var i = 4; i < 8; i++) {
                context.lineWidth = 0;
                context.beginPath();
                context.moveTo(triangleGroup[i][0][0], triangleGroup[i][0][1]);
                context.lineTo(triangleGroup[i][1][0], triangleGroup[i][1][1]);
                context.lineTo(triangleGroup[i][2][0], triangleGroup[i][2][1]);
                context.lineTo(triangleGroup[i][0][0], triangleGroup[i][0][1]);
                context.closePath();
                context.fillStyle = "hsla(" + colorGroupOne[i][0] + "," + colorGroupOne[i][1] + "," + colorGroupOne[i][2] + "," + colorGroupOne[i][3] + ")";
                context.fill();

            }

        },
        clear = function() {
            context.clearRect(-300, -300, 960, 960);
        }
        /*--------------------------------------------------------------------------------------------------------*/
        /*------------------------------Initialization------------------------------------------------------------*/
        /*--------------------------------------------------------------------------------------------------------*/

    var init = function() {
        calculateTrack();
        calulateStartGroupX();
        calulateStartGroupXY();
        draw();

    }
    init();
    setInterval(function() {
        calculatePointsUpdate();
        calulateColorUpdate();
        calulateStartGroupX();
        calulateStartGroupXY();
        clear();
        draw();
    }, 10);

}