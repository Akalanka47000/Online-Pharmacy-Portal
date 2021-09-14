function checkPassword{}{
	if (document.getElementById("pwd").value!=document.getElementById("reenterpwd").value){
		alert("Passwprd Mismatch!");
		return false;
	} else{
		alert("Success!");
		return true;
	}
}