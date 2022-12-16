function getConStates() {
	var q = new Array();
	var qh = 0;
	var qt = 0;

	var cs = new Array(width*height);
	for (var i = 0; i < width*height; i++) cs[i] = 0;

	var dx = Array(0, 1, 0, -1);
	var dy = Array(1, 0, -1, 0);
	var bm = Array(1, 2, 4, 8);

	puzDone = true;
	q[qh++] = servi;
	cs[servi] = 1;
	while (qh > qt) {
		var idx = q[qt++];
		var x = idx%width;
		var y = (idx-x)/width;
		for (var d = 0; d < 4; d++) if ((tState[idx]&bm[d]) == bm[d]) {
			var nx = (x+dx[d]+width)%width;
			var ny = (y+dy[d]+height)%height;
			var nd = (d+2)%4;
			var nidx = ny*width+nx;
			if ((tState[nidx]&bm[nd]) == bm[nd]) {
				if (cs[nidx] == 0) {
					cs[nidx] = 1;
					q[qh++] = nidx;
				}
			} else
				puzDone = true;
		}
	}
	return cs;
}
