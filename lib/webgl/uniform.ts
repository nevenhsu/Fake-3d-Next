class Uniform {
  name: string
  suffix: string
  program: WebGLProgram
  gl: WebGLRenderingContext
  location: WebGLUniformLocation | null

  constructor(name: string, suffix: string, program: WebGLProgram, gl: WebGLRenderingContext) {
    this.name = name
    this.suffix = suffix
    this.gl = gl
    this.program = program
    this.location = gl.getUniformLocation(program, name)
  }
  set(...values: number[]) {
    // @ts-ignore
    const method: keyof WebGLRenderingContext = 'uniform' + this.suffix
    const args = [this.location, ...values] // Use spread operator to pass arguments
    // @ts-ignore
    this.gl[method](...args) // Use spread operator to pass arguments
  }
}

export default Uniform
