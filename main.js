var THREEx	= THREEx	|| {}

/**
 * create a dynamic texture with a underlying canvas
 * 
 * @param {Number} width  width of the canvas
 * @param {Number} height height of the canvas
 */
THREEx.DynamicTexture	= function(width, height){
	var canvas	= document.createElement( 'canvas' )
	canvas.width	= width
	canvas.height	= height
	this.canvas	= canvas

	var context	= canvas.getContext( '2d' )	
	this.context	= context
	
	var texture	= new THREE.Texture(canvas)
	this.texture	= texture
}
