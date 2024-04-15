# Backend-baserad webbutveckling | Moment 2, Uppgift 1
I detta repo finns koden för ett REST API som har byggts med Express.
API'et är skapat för att lagra och hantera tidigare arbetserfarenheter, gundläggande funktionalitet för CRUD-metoder har implementerats.

## Länk till API
https://backend-moment2-uppg1.onrender.com/api/workexperience


## Användning
| Metod | Ändpunkt | Beskrivning |
|-------|----------|-------------|
| GET | /workexperience | Hämtar alla arbetserfarenheter | 
| POST | /workexperience | Lägger till en arbetserfarenhet, kräver att ett arbetserfarenhets-objekt skickas med |
| PUT | /workexperience/id | Uppdaterar arbetserfarenhet med angivet id, kräver att ett arbetserfarenhets-objekt skickas med |
| DELETE | /workexperience/id | Raderar arbetserfarenhet med angivet id. |

Ett arbetserfarenhets-objekt skickas/returneras med följande struktur(Ex):
```
{
  companyname: "Däckhuset Torvinge"
  jobtitle: "Däckmontör",
  location: "Linköping",
  startdate: "YYYY-MM-DD",
  enddate: "YYYY-MM-DD",
  description: "Verkstadsarbete som innefattar däckskiften, montering av däck på fälg, hjulinställningar med mera."
}
```
