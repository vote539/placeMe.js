/**
 * placeMe.js - A jQuery polyfill for the placeholder attribute.
 *
 * @author Matt Sparks <matt@mattsparks.com>
 *
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means. 
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law. 
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org/>
 */

$(function() { setTimeout(function() {

	//Check to see if placeholder is supported
	//Hat tip: http://diveintohtml5.info/detect.html#input-placeholder
	function supports_input_placeholder() {
		var i = document.createElement('input');
		return 'placeholder' in i;
	}
	 
	if(supports_input_placeholder())
	{
		// The placeholder attribute is supported
		//Do nothing. Smile. Go outside
	}
	else
	{
		// The "placeholder" attribute isn't supported. Let's fake it.
		
		// Get all the input elements with the "placeholder" attribute
		var $placeholder = $("[placeholder]"); 
		
		// Go through each element and assign the value to the value of the "placeholder" attribute
		// This will allow users with no support to see the default text
		$placeholder.each(function(){

			// The element we're working with.
			var $this = $(this),
		 		placeholderTxt = $this.attr("placeholder");			

			// The password input type in IE is masked, so the solution for other input types won't work.
			// We will dynamically change the field type to text and pack to password when text is entered.
			if($this.attr("type") == "password") {
				$this.val(placeholderTxt);
				$this.attr("type", "text");
				$this.focus(function(){
					$(this).attr("type", "password");
				});

			} else if ($this.val() == "") {
				// This field is not a password field.  Just perform a value swap.
				$this.val(placeholderTxt);
			}
		});

		// When a user clicks the input (on focus) the default text will be removed
		$placeholder.focus(function() {
			var $this = $(this),
				value =  $this.val(),
				placeholderTxt = $this.attr("placeholder");
			
			if(value == placeholderTxt)
			{
				$this.val("");
			}
		});
		
		// When a user clicks/tabs away from the input (on blur) keep what they typed
		// Unless they didn't type anything, in that case put back in the default text
		$placeholder.blur(function(){
			var $this = $(this),
				value =  $this.val(),
				placeholderTxt = $this.attr("placeholder");
			
			if((value == '') && ($this.attr("type") != "password"))
			{
				$this.val(placeholderTxt);
			}
		});
		
		// Since we're inputing text into the "value" attribute we need to make 
		// sure that this default text isn't submitted with the form, potentially
		// causing validation issues. So we're going to remove the default text
		// and submit the inputs as blank.
		$("form").submit(function(){
			var $input = $(":input");
			
			$input.each(function() {
				if($this.val() == $this.attr("placeholder"))
				{
					$this.val("");
				}
			});
		});
	}
	
}, 500); });