<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Button, Loading } from 'carbon-components-svelte';
	import { Return } from 'carbon-icons-svelte';
</script>


<Breadcrumb noTrailingSlash>
	<BreadcrumbItem href="/">Home</BreadcrumbItem>
	<BreadcrumbItem href="/profile" isCurrentPage>Profile</BreadcrumbItem>
</Breadcrumb>
<br />

<div>
    <h1>Profile is under construction ...</h1>
    <Button kind="primary" icon={Return} href="/">
        Go back
    </Button>
</div>

<style>
    div {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 500px;
        max-height: 100vh;
        gap: 2rem;
    }
</style>