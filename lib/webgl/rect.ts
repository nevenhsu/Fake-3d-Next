class Rect {
  buffer: WebGLBuffer | null
  verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])

  constructor(gl: WebGLRenderingContext) {
    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.verts, gl.STATIC_DRAW)
  }

  render(gl: WebGLRenderingContext) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

export default Rect
