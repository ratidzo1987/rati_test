const express = require("express");
const mysql = require("mysql");
var app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

// Add headers
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.header('Access-Control-Allow-Origin', 'http://192.168.250.39');
	// Request methods you wish to allow
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR');

	if (req.headers.origin) 
	{
		res.header('Access-Control-Allow-Origin', req.headers.origin);
	}

	if (req.method === 'OPTIONS') 
	{
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
		return res.status(200).json({});
	}
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.header('Access-Control-Allow-Credentials', true);
	// Pass to next layer of middleware
	next();
});

// database connection definition
var mysqlconnction = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: 'Realcore2018',
		database: 'Rati_Test',
		multipleStatements: true,
		insecureAuth: true
	}
);

// Verbindung herstellen
mysqlconnction.connect((err) => {
	if (!err) 
	{
		console.log('DB connection succeeded!');
	}

	else 
	{
		console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
	}
}
);

// Server Starten
app.listen(3044, () => console.log('Express Server is started in pot 3044'));

// ---------------------------------------------------------------
// abhängig vom Typ wird ein anderes SQL zusammengebaut
// im Datenobjekt werden die Daten gesammelt übergeben 
// ---------------------------------------------------------------
app.get('/MitarbeiterList', (req, res) => 
{
	// Datensatz ändern
	//read the data from the mitarbeiter table
	var userID = req.body.ID;
	var sql = "SELECT * FROM `Mitarbeiter`";
	
	console.log("MitarbeiterList -" + sql);

	// Query starten
	mysqlconnction.query(sql, (err, rows, fields) => {
		if (!err) 
		{
			res.send(rows);
		}
		else 
		{
			console.log(err);
		}
	})
}
);

app.post('/Workers', (req, res) => 
{		
	// Datensatz ändern
	//UPDATE `Mitarbeiter` SET `Vorname`='ra',`Nachname`='ra',`Ort`='ra' WHERE ID=1
	if(req.body.TYP === "update")
	{
		var sql = "UPDATE  Mitarbeiter "; 
		sql = sql + "SET Vorname ='" + req.body.Vorname + "', Nachname ='" + req.body.Nachname + "', Ort='" + req.body.Ort + "' ";
		sql = sql + "WHERE ID ='" + req.body.ID +"'";
	}

	// neuen Datensatz einfügen
	if(req.body.TYP === "new")
	{
		// INSERT INTO `Mitarbeiter` (`ID`, `Vorname`, `Nachname`, `Ort`) VALUES (NULL, 'uwe', 'Fischer', 'Bergkamen');
		var sql = "INSERT INTO Mitarbeiter (`ID`, `Vorname`, `Nachname`, `Ort`) VALUES ( NULL,";
		sql = sql + "'" + req.body.Vorname + "', ";
		sql = sql + "'" + req.body.Nachname + "', ";
		sql = sql + "'" + req.body.Ort + "'";  // letzter Wert OHNE komma
		sql = sql + ")";				
	}

	// Datensatz löschen
	//DELETE FROM `Mitarbeiter` WHERE ID = 7
	if(req.body.TYP === "delete")
	{
		var sql = "DELETE FROM Mitarbeiter ";
		sql = sql + "WHERE ID = '" + req.body.ID +"'";			
	}

	console.log("rati_test_service - Workers - " + req.body.TYP, sql);

	// Query starten
	mysqlconnction.query(sql,(err, rows, fields)=>
	{
		if(!err)
		{
			res.send(rows);
		}
		else
		{
			console.log(err);
		}
	});

})
