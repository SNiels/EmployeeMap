${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;

    // Uncomment the constructor to change template settings.
    Template(Settings settings)
    {
        settings.IncludeProject("EmployeeMap.Data");
		settings.OutputExtension = "d.ts";
    }
}
declare module "models"{
	$Classes(c => c.Attributes.Any(a => a.Name == "ExportToTypeScript"))[
	export interface $Name {
		$Properties[
			$name: $Type;
		]
	}]
}