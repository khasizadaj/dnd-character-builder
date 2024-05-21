<script lang="ts">
	import {
		ExpandableTile,
		ListItem,
		Tag,
		Tile,
		UnorderedList
	} from 'carbon-components-svelte';

	export let character;
	$: feature_sources = character.feature_sources;
</script>

<div>
	<br /><br />
	<Tile>
		<h1>Features</h1>
	</Tile>

	{#each feature_sources as feature_source}
		<ExpandableTile tileExpandedLabel="View less" tileCollapsedLabel="View more">
			<div slot="above">
				<h3>
					{feature_source.title}
					<Tag type="cyan">{feature_source.type.toUpperCase()}</Tag>
				</h3>
			</div>
			<div slot="below">
				<br />
				{#each feature_source.features as feature}
					<ExpandableTile
						tileExpandedLabel="View less"
						tileCollapsedLabel="View more"
						on:click={(e) => {
							e.stopPropagation();
						}}
					>
						<div slot="above">
							<h4>
								{feature.title}
								{#if feature.accessedLevel <= character.level}
									<Tag type="cool-gray">Lvl. {feature.accessedLevel}</Tag>
								{:else}
									<Tag type="outline" disabled>
										Lvl. {feature.accessedLevel}
									</Tag>
								{/if}
							</h4>
						</div>
						<div slot="below">
							<br />
							<UnorderedList expressive>
								{#each feature.description as line}
									<ListItem>{line}</ListItem>
								{/each}
							</UnorderedList>
							<br /> <br />
						</div>
					</ExpandableTile>
				{/each}
			</div>
		</ExpandableTile>
	{/each}
</div>

<style>
	h1 {
		text-align: center;
	}
</style>
