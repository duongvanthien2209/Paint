function Paint() {
    this.canvas = null;
    this.context = null;
    this.select = null;
    this.width = 600;
    this.height = 500;
    this.color = '#000000';
    this.drawing = false;
    this.lineWidth = 2;
    this.mousePosition = { x: 0, y: 0 };
    this.isDrawLine = false;

    this.init = function () {
        // Create Canvas
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        document.body.appendChild(this.canvas);

        // Create select
        this.select = document.createElement('select');
        this.select.innerHTML = `<option value="free">Free</option><option value="line">Line</option><option value="circle">Circle</option>`;
        document.body.appendChild(this.select);

        // Bind this
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick1 = this.onMouseClick1.bind(this);
        this.onMouseMove1 = this.onMouseMove1.bind(this);

        this.select.addEventListener('change', this.chooseSelect.bind(this));
        // this.eventListener();
    }

    this.chooseSelect = function () {
        var selection1 = this.select.value;

        switch (selection1) {
            case 'free':
                this.eventListener(); 
                break;

            case 'line':
                this.eventListener1();
            default:
                break;
        }
    }

    this.eventListener = function () {
        this.canvas.addEventListener('mousedown', this.onMouseDown);
        this.canvas.addEventListener('mouseup', this.onMouseUp);
        this.canvas.addEventListener('mousemove', this.onMouseMove);
    }

    this.eventListener1 = function() {
        this.canvas.removeEventListener('mousedown', this.onMouseDown);
        this.canvas.removeEventListener('mouseup', this.onMouseUp);
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
        this.canvas.addEventListener('click', this.onMouseClick1);
    }

    this.onMouseClick1 = function(event) {
        // console.log('Done');
        this.mousePosition = this.getMousePosition(event);
        this.drawing = true;
        this.canvas.addEventListener('mousemove', this.onMouseMove1);
    }

    this.onMouseMove1 = function(event) {
        if(this.drawing)
        {
            var newMousePosition = this.getMousePosition(event);
            this.drawLine(this.mousePosition.x, this.mousePosition.y, newMousePosition.x, newMousePosition.y);
        }
    }

    this.onMouseDown = function (event) {
        this.drawing = true;
        this.mousePosition = this.getMousePosition(event);
    }

    this.onMouseUp = function (event) {
        this.drawing = false;
    }

    this.onMouseMove = function (event) {
        if (this.drawing) {
            var newMousePosition = this.getMousePosition(event);
            this.drawLine(this.mousePosition.x, this.mousePosition.y, newMousePosition.x, newMousePosition.y);
            this.mousePosition = newMousePosition;
        }
    }

    this.drawLine = function (startX, startY, endX, endY) {
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.color;
        this.context.stroke();
    }

    this.getMousePosition = function (event) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
}

var paint = new Paint();
// console.log(paint.canvas);
paint.init();