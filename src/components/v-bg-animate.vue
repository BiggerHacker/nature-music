<template>
  <canvas class="bg-canvas" ref="bgCanvas"></canvas>
</template>

<script>
  export default {
    name: 'bg-animate',
    created () {
      this.$nextTick(() => {
        let canvas = this.$refs.bgCanvas
        let ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        let ball = this._ball(canvas, 5, '#ddd')
        let cfg = {
          canvas: canvas,
          ctx: ctx,
          ball: ball,
          lineColor: '#ddd'
        }
        this._run(60, cfg)
      })
    },
    methods: {
      _ball (canvas, ballRadius, ballColor) {
        let ballList = []
        for (let i = 100 - 1; i >= 0; i--) {
          let ball = {}
          ball.x = this._getRandom(20, canvas.width - 20)
          ball.y = this._getRandom(20, canvas.height - 20)
          ball.positionX = this._getIndex()
          ball.positionY = this._getIndex()
          ball.speedX = Math.random()
          ball.speedY = Math.random()
          ball.radius = ballRadius
          ball.color = ballColor
          ballList.push(ball)
        }
        return ballList
      },
      _getRandom (first, last) {
        let choice = last - first + 1
        return Math.floor(Math.random() * choice + first)
      },
      _getIndex () {
        let arr = [0, 1]
        let index = Math.floor(Math.random() * arr.length)
        if (index === 0) {
          index = -1
        }
        return index
      },
      _run (fps, cfg) {
        setInterval(() => {
          this._draw(cfg.ball, cfg.canvas, cfg.ctx)
          this._drawLine(cfg.ball, cfg.ctx, cfg.lineColor)
          this._moveBall(cfg.ball, cfg.canvas)
        }, 1000 / fps)
      },
      _draw (list, canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = list.length - 1; i >= 0; i--) {
          ctx.save()
          ctx.beginPath()
          ctx.fillStyle = list[i].color
          ctx.arc(list[i].x, list[i].y, list[i].radius, 0, Math.PI * 2, false)
          ctx.closePath()
          ctx.fill()
          ctx.restore()
        }
      },
      _drawLine (list, ctx, lineColor) {
        for (let i = list.length - 1; i >= 0; i--) {
          for (let j = list.length - 1; j >= 0; j--) {
            let xx = Math.pow((list[i].x - list[j].x), 2)
            let yy = Math.pow((list[i].y - list[j].y), 2)
            let zz = Math.sqrt(xx + yy)

            if (zz <= 100 && zz >= 20) {
              ctx.save()
              ctx.beginPath()
              ctx.strokeStyle = lineColor
              ctx.lineWidth = 0.2
              ctx.moveTo(list[i].x, list[i].y)
              ctx.lineTo(list[j].x, list[j].y)
              ctx.closePath()
              ctx.stroke()
              ctx.restore()
            }
          }
        }
      },
      _moveBall (list, canvas) {
        for (let i = list.length - 1; i >= 0; i--) {
          list[i].x += list[i].speedX * list[i].positionX
          list[i].y += list[i].speedY * list[i].positionY

          if (list[i].x + list[i].radius >= canvas.width || list[i].x - list[i].radius <= 0) {
            list[i].positionX *= -1
          }

          if (list[i].y + list[i].radius >= canvas.height || list[i].y - list[i].radius <= 0) {
            list[i].positionY *= -1
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bg-canvas {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
</style>
