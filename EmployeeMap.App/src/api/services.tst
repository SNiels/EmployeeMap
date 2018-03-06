${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;
    using Typewriter.Extensions.WebApi;
    
    string ReturnType(Method m) => m.Type.Name == "IHttpActionResult" ? "void" : m.Type.Name;
    string ServiceName(Class c) => c.Name.Replace("Controller", "Service");
    string ControllerName(Class c) => c.Name.Replace("Controller", string.Empty);
    string CustomUrl(Method m) => m.Url().Replace("api/", string.Empty);
    string SafeType(Parameter p) => SafeType(p.Type);
    string SafeReturnType(Method m) => SafeType(m.Type);
    //string SafeType(Type t) => t.Namespace.StartsWith("EmployeeMap") ? $"models.{t.Name}" : t.Name;
    string SafeType(Type t){
        bool isEnumerable = t.IsEnumerable;
        if(isEnumerable){
            t = t.TypeArguments.First();
        }
        var typeName = t.Namespace.StartsWith("EmployeeMap") ? $"models.{t.Name}" : t.Name;
        return isEnumerable ? $"{typeName}[]" : typeName;
    }

    string FetchBody(Method m) => m.RequestData() == "null" ? string.Empty : $"body: JSON.stringify({m.RequestData()})";

    Template(Settings settings)
    {
        settings.IncludeProject("EmployeeMap.Api");
        settings.OutputFilenameFactory = (file => ServiceName(file.Classes.First()));
    }
}
import * as models from "models";

$Classes(c => c.Attributes.Any(a => a.Name == "ExportToTypeScript"))[
export default class $ServiceName {
    constructor(private apiRoot: string) {}
	$Methods[
    public async $name($Parameters[$name: $SafeType][, ]) : Promise<$SafeReturnType> {
        let response = await fetch(`${this.apiRoot}$CustomUrl`, {
            method: "$HttpMethod", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            $FetchBody
        });
        return <$SafeReturnType> await response.json();
    }
    ]
}
]