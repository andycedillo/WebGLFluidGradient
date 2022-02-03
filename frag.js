const frag = `
	precision highp float;

	uniform vec2 u_resolution;
	uniform vec2 u_mouse;
	uniform vec2 u_pmouse;
	uniform float u_time;
	uniform vec3 u_lightDir;
	uniform vec3 u_col;
	uniform mat3 uNormalMatrix;
	uniform float u_pixelDensity;
	uniform sampler2D tex0;

	//attributes, in
	varying vec4 var_centerGlPosition;
	varying vec3 var_vertNormal;
	varying vec2 var_vertTexCoord;

	${frag_functions_default}

	void main(){
		vec2 st = var_vertTexCoord.xy /u_resolution.xy;
		// st.y = 1.0 - st.y;
		vec3 color = vec3(0.,0.,0.);
		float d = distance(u_mouse,st);
		color=  vec3( sin(u_mouse.x*10.)/2.+0.5,cos(u_mouse.y*4.)/2.+0.5,cos(u_mouse.y*20.+u_mouse.x*20.)/2.+0.5)*(d>0.1?0.:1.);
		
		// st = vec2(st.x+sin(st.y*2.*3.14),st.y+cos(st.x*2.*3.14)  )/2.;

		// st = vec2(st.x+cos(st.y*20.*3.14)/20.,st.y+sin(st.x*20.*3.14)/20.  );
		
		// vec2 delta_mouse = u_mouse-u_pmouse;
		// vec2 delta_force = -0.1*delta_mouse/sqrt(sqrt(d+0.1));
		float waveMult = cnoise(vec3(st/10.,u_time/10.))*5.+5.;
		float waveMult2 = cnoise(vec3(st/10.,u_time/10.+5000.))*5.+5.;
		float ampMult = cnoise(vec3(st/10.,u_time/10.))*200.+400. + d;
		float ampMult2 = cnoise(vec3(st/5.,u_time/10.+5000.))*200.+400. + d;
	
		st = st+vec2(cos(st.y*waveMult*3.14)/ampMult + cnoise(vec3(st,u_time+5000.))/1000.,
							   sin(st.x*waveMult2*3.14)/ampMult2+ cnoise(vec3(st,u_time+1.))/1000.);
		 // st =vec2 (st.x + waveMult, st.y+waveMult2);
		color+=texture2D(tex0,st).rgb*0.995;
	
		

		gl_FragColor= vec4(color,1.0);
	}
`