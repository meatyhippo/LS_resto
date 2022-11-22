// ==UserScript==
// @name         add test account button to LSK admin
// @namespace    https://manager.trial.lsk.lightspeed.app/admin
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://manager.trial.lsk.lightspeed.app/admin/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
$('#content').prepend(`
<div>
	<h2>
		Andy test account
	</h2>
	<table id="businessTable" class="table table-striped  criteriaView dataTable" style="max-width:50%;">
	<tbody>
	<tr class="odd">
		<td class="center"><a href="#"><i class="icon-plus-sign"></i></a></td>
		<td class=" sorting_1"><span>20823</span></td>
		<td class=""><span><a href="/admin/index?bizId=20823&amp;what=loginAs">Andy's resto</a></span></td>
	</tr>
	</tbody>
	</table>
</div>
`)
})();