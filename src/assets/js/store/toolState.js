class ToolStore {
  constructor() {
    this.tool = null
  }

  setTool(tool) {
    this.tool = tool
  }

  setColor(color) {
    this.tool.fillColor = color
    this.tool.strokeColor = color
  }

  setLineWidth(width) {
    this.tool.lineWidth = width
  }
}

export const tool = new ToolStore()
